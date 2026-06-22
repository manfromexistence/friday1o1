# AI Frontend Training Data Sources

To scale this foundational dataset to millions of rows, do not scrape GitHub indiscriminately. Instead, utilize the following curated, high-signal sources. All listed sources possess permissive licensing (MIT, Apache 2.0, or Open RAIL) suitable for commercial model fine-tuning.

## 1. Massive Pre-compiled Datasets (HuggingFace)

Instead of scraping raw GitHub yourself, use datasets that have already done deduplication and PII redaction:

*   **BigCode / The Stack v2:**
    *   **Focus:** The gold standard for code LLMs.
    *   **How to use:** Filter specifically for `HTML`, `CSS`, and `JavaScript`.
    *   **Scale:** Contains over 3 Terabytes of frontend code.
    *   **Link:** `https://huggingface.co/datasets/bigcode/the-stack-v2`
*   **WebSight (HuggingFace M4):**
    *   **Focus:** Specifically built for Vision-Language Models and UI generation. Contains 2 million highly structured HTML/CSS pairs aligned with screenshots.
    *   **Link:** `https://huggingface.co/datasets/HuggingFaceM4/WebSight`
*   **OpenCodeInterpreter Dataset:**
    *   **Focus:** Excellent for step-by-step instruction tuning (e.g., "Make this div bounce on hover").
    *   **Link:** `https://huggingface.co/datasets/m-a-p/OpenCodeInterpreter-Dataset`

## 2. Premium Open-Source UI Libraries

To teach a model "good taste" (modern aesthetics, glassmorphism, 60fps animations), fine-tune heavily on the source code of these premium libraries:

*   **Tailwind UI (Free Tiers) / Headless UI:**
    *   Teaches semantic class structuring and accessibility (a11y).
    *   `https://github.com/tailwindlabs/headlessui`
*   **Radix UI / Shadcn UI:**
    *   Teaches complex, state-driven React/Vanilla interactions that are heavily accessible.
    *   `https://github.com/radix-ui/primitives`
*   **Framer Motion:**
    *   Crucial for teaching the model complex spring physics and layout animations (`FLIP` architecture).
    *   `https://github.com/framer/motion`
*   **GSAP (GreenSock):**
    *   The industry standard for complex timeline animations.
    *   `https://github.com/greensock/GSAP`

## 3. High-Signal "Project" Repositories

These repositories contain excellent "complete page" contexts rather than just isolated components:

*   **Brad Traversy / 50 Projects 50 Days:**
    *   Excellent for foundational micro-interactions.
    *   `https://github.com/bradtraversy/50projects50days`
*   **Cruip / Free Landing Pages:**
    *   Teaches high-end, modern SaaS landing page structures.
    *   `https://github.com/cruip/free-landing-page-template`
*   **Awwwards Rebuilds (Various MIT Repos):**
    *   Search GitHub specifically for `awwwards rebuild` to find developers who have reverse-engineered award-winning sites. This teaches the model cutting-edge WebGL, Canvas, and scroll-hijacking techniques.

## Strategy for 50 Million Scale

1.  Download **The Stack v2** (HTML/CSS subset).
2.  Run a strict heuristic filter over it (reject files >100kb, reject minified `.min.js` files, reject files without standard formatting).
3.  Combine the filtered mass dataset with the premium examples located in this repository's `full-pages` and `animation-showcases` directories.
4.  Weight the premium examples heavily (e.g., duplicate them 10x in the JSONL) so the model prioritizes their high-quality aesthetic over the average quality of the massive dataset.