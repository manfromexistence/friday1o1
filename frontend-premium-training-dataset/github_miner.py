"""
Massive GitHub Miner for AI Frontend Datasets.
This script is designed to be deployed to a distributed cluster to mine
millions of high-quality HTML/CSS/JS files from permissive GitHub repositories.
"""

import json
import urllib.request
import urllib.error
import time
import os

OUTPUT_FILE = os.path.join(os.path.dirname(__file__), 'real_world_finetune.jsonl')
# We limit to a few items here for the Proof of Concept.
# On a cluster, set this to 50,000,000 and provide a GitHub PAT.
TARGET_SAMPLES = 50

def search_github(query, per_page=10):
    url = f"https://api.github.com/search/repositories?q={urllib.parse.quote(query)}+language:javascript+language:html+language:css&sort=stars&order=desc&per_page={per_page}"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode())
    except urllib.error.HTTPError as e:
        print(f"GitHub API Error: {e.code}. Might be rate limited.")
        return None

def fetch_repo_contents(owner, repo):
    # Fetch the root tree (simplified for POC)
    url = f"https://api.github.com/repos/{owner}/{repo}/contents"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response:
            return json.loads(response.read().decode())
    except Exception:
        return []

def fetch_raw_file(download_url):
    req = urllib.request.Request(download_url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response:
            return response.read().decode('utf-8', errors='ignore')
    except Exception:
        return None

def run_miner():
    print(f"Starting distributed miner POC. Target samples: {TARGET_SAMPLES}")
    queries = ["dashboard UI", "landing page", "animations", "glassmorphism"]
    samples_gathered = 0

    with open(OUTPUT_FILE, 'w') as f:
        for query in queries:
            if samples_gathered >= TARGET_SAMPLES: break

            print(f"Searching for top repos matching: '{query}'...")
            search_results = search_github(query)
            if not search_results or 'items' not in search_results:
                time.sleep(2)
                continue

            for repo in search_results['items']:
                if samples_gathered >= TARGET_SAMPLES: break

                owner = repo['owner']['login']
                repo_name = repo['name']
                print(f"  Scraping repo: {owner}/{repo_name}")

                contents = fetch_repo_contents(owner, repo_name)
                for item in contents:
                    if samples_gathered >= TARGET_SAMPLES: break

                    if item.get('type') == 'file' and item.get('name').endswith(('.html', '.css', '.js')):
                        raw_url = item.get('download_url')
                        if raw_url:
                            code = fetch_raw_file(raw_url)
                            if code and len(code) > 200: # Quality heuristic: skip tiny files
                                instruction = f"Write high-quality frontend code inspired by {owner}/{repo_name}."
                                jsonl_line = json.dumps({"instruction": instruction, "output": code})
                                f.write(jsonl_line + '\n')
                                samples_gathered += 1
                                print(f"    -> Gathered: {item['name']} ({samples_gathered}/{TARGET_SAMPLES})")
                time.sleep(1) # Respect API limits

    print(f"Mining complete. Gathered {samples_gathered} real-world files.")

if __name__ == "__main__":
    run_miner()
