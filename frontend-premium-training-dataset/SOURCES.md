# AI Frontend Training Data Sources

To scale this foundational dataset to millions of rows, do not scrape GitHub indiscriminately. Instead, utilize the following curated, high-signal sources. All listed sources possess permissive licensing (MIT, Apache 2.0, or Open RAIL) suitable for commercial model fine-tuning.

## 1. Massive Multimodal & UI-Specific Datasets (HuggingFace)

The modern standard for generating frontend code is Multimodal (Vision-Language). These datasets are explicitly curated to pair HTML/CSS code with screenshots, structure, and intent, allowing models to reach a 50M+ scale.

*   **HuggingFaceM4/WebSight:**
    *   **Focus:** Specifically built for Vision-Language Models and UI generation.
    *   **Scale:** Contains over 2 million highly structured HTML/CSS pairs aligned with synthetically generated web screenshots.
    *   **Link:** `https://huggingface.co/datasets/HuggingFaceM4/WebSight`
    *   *Note: Also look at `argilla/websight-5K-multimodal` for a highly curated, human-preference evaluated subset.*
*   **SALT-NLP/Design2Code:**
    *   **Focus:** State-of-the-art benchmark and dataset for converting visual designs into functional HTML/CSS. Highly critical for advanced UI models.
    *   **Link:** `https://huggingface.co/datasets/SALT-NLP/Design2Code`
*   **lilyzhng/uigen-ui-code-gen-full:**
    *   **Focus:** Dedicated large-scale dataset specifically crafted for teaching LLMs to output structural UI code based on layout constraints.
    *   **Link:** `https://huggingface.co/datasets/lilyzhng/uigen-ui-code-gen-full`

## 2. Massive Pre-compiled Code Datasets

If your goal is pure code-completion rather than multimodal vision, use datasets that have already done massive deduplication and PII redaction on GitHub code:

*   **BigCode / The Stack v2:**
    *   **Focus:** The absolute gold standard for code LLMs.
    *   **Scale:** Contains over 3 Terabytes of frontend code. Filter specifically for `HTML`, `CSS`, and `JavaScript`.
    *   **Link:** `https://huggingface.co/datasets/bigcode/the-stack-v2`
*   **khoomeik/gzipscale-code-html-256M:**
    *   **Focus:** Massive scale HTML specifically formatted and chunked for optimal compression and LLM training ingestion.
    *   **Link:** `https://huggingface.co/datasets/khoomeik/gzipscale-code-html-256M`
*   **hardikg2907/github-code-html-css:**
    *   **Focus:** Pre-scraped, cleanly split massive GitHub repository data strictly isolating HTML and CSS structure.
    *   **Link:** `https://huggingface.co/datasets/hardikg2907/github-code-html-css`

## 3. Premium Open-Source UI Libraries

To teach a model "good taste" (modern aesthetics, glassmorphism, 60fps animations), augment the massive datasets above by heavily over-indexing the source code of these premium libraries:

*   **Tailwind UI (Free Tiers) / Headless UI:**
    *   Teaches semantic class structuring and accessibility (a11y).
    *   `https://github.com/tailwindlabs/headlessui`
*   **Radix UI / Shadcn UI:**
    *   Teaches complex, state-driven React/Vanilla interactions that are heavily accessible.
    *   `https://github.com/radix-ui/primitives`
*   **Framer Motion & GSAP:**
    *   Crucial for teaching the model complex spring physics and layout animations (`FLIP` architecture).
    *   `https://github.com/framer/motion`
    *   `https://github.com/greensock/GSAP`

## Strategy for 50 Million Scale

1.  Download **WebSight** (for structural layout logic) and the HTML subset of **The Stack v2** (for raw DOM diversity).
2.  Run a strict heuristic filter over them (reject files >100kb, reject minified `.min.js` files, reject files without standard formatting).
3.  Combine the filtered massive dataset with the premium examples located in this repository's `full-pages` and `animation-showcases` directories.
4.  Weight the premium examples heavily (e.g., duplicate them 10x in the JSONL) so the model prioritizes their high-quality aesthetic and smooth physics over the average quality of the massive web scrape.