# Ultimate AI Frontend Training Data Sources

To scale this foundational dataset to millions of rows, do not scrape GitHub indiscriminately. Instead, utilize the following curated, high-signal sources. All listed sources possess permissive licensing (MIT, Apache 2.0, or Open RAIL) suitable for commercial model fine-tuning.

## 1. Massive Multimodal & UI-Specific Datasets (HuggingFace)

The modern standard for generating frontend code is Multimodal (Vision-Language). These datasets are explicitly curated to pair HTML/CSS code with screenshots, structure, and intent, allowing models to reach a 50M+ scale.

*   **HuggingFaceM4/WebSight:**
    *   **Focus:** Specifically built for Vision-Language Models and UI generation. Contains over 2 million highly structured HTML/CSS pairs aligned with synthetically generated web screenshots.
    *   **Link:** `https://huggingface.co/datasets/HuggingFaceM4/WebSight`
*   **SALT-NLP/Design2Code:**
    *   **Focus:** State-of-the-art benchmark and dataset for converting visual designs into functional HTML/CSS. Highly critical for advanced UI models.
    *   **Link:** `https://huggingface.co/datasets/SALT-NLP/Design2Code`

## 2. Interactive DOM & Web Navigation Datasets (NEW)

To build a model that doesn't just write static HTML, but understands *how* a user interacts with the DOM (clicking, typing, state changes), you must include interactive web datasets.

*   **osunlp/Mind2Web:**
    *   **Focus:** Towards a Generalist Agent for the Web. This contains millions of actions across thousands of websites, mapping DOM states to interactive actions. Critical for teaching the model how buttons, forms, and JS states actually function in the real world.
    *   **Link:** `https://huggingface.co/datasets/osunlp/Mind2Web`
    *   *Also see:* `osunlp/Multimodal-Mind2Web`
*   **TIGER-Lab/WebInstructSub:**
    *   **Focus:** High-quality instruction-tuning data for web programming and UI generation. Crucial for chat-based models.
    *   **Link:** `https://huggingface.co/datasets/TIGER-Lab/WebInstructSub`

## 3. Framework & Utility Specific Datasets (NEW)

Modern frontends heavily rely on utility classes (Tailwind). A 50M parameter model needs dedicated training on these architectures.

*   **Eim/tailwind-html** & **Reubencf/frontend-html-tailwind-js:**
    *   **Focus:** Massive scrapes of pure Tailwind CSS architecture. Teaches the model semantic utility class combinations.
    *   **Links:**
        *   `https://huggingface.co/datasets/Eim/tailwind-html`
        *   `https://huggingface.co/datasets/Reubencf/frontend-html-tailwind-js`

## 4. Massive Pre-compiled Code Datasets

For pure code-completion bulk, use datasets that have already done massive deduplication and PII redaction on GitHub code:

*   **BigCode / The Stack v2:**
    *   **Focus:** The absolute gold standard for code LLMs. Over 3 Terabytes of frontend code. Filter specifically for `HTML`, `CSS`, and `JavaScript`.
    *   **Link:** `https://huggingface.co/datasets/bigcode/the-stack-v2`
*   **khoomeik/gzipscale-code-html-256M:**
    *   **Focus:** Massive scale HTML specifically formatted and chunked for optimal compression and LLM training ingestion.
    *   **Link:** `https://huggingface.co/datasets/khoomeik/gzipscale-code-html-256M`

## 5. Premium Open-Source UI Libraries

To teach a model "good taste" (modern aesthetics, glassmorphism, 60fps animations), augment the massive datasets above by heavily over-indexing the source code of these premium libraries:

*   **Tailwind UI (Free Tiers) / Headless UI:** `https://github.com/tailwindlabs/headlessui`
*   **Radix UI / Shadcn UI:** `https://github.com/radix-ui/primitives`
*   **Framer Motion & GSAP:**
    *   `https://github.com/framer/motion`
    *   `https://github.com/greensock/GSAP`

## Strategy for 50 Million Scale

1.  Download **WebSight** (for structural layout logic), **Mind2Web** (for interactive DOM mapping), and the HTML subset of **The Stack v2** (for raw DOM diversity).
2.  Run a strict heuristic filter over them (reject files >100kb, reject minified `.min.js` files, reject files without standard formatting).
3.  Combine the filtered massive dataset with the premium examples located in this repository's `full-pages` and `animation-showcases` directories.
4.  Weight the premium examples and the Framer Motion repos heavily (e.g., duplicate them 10x in the JSONL) so the model prioritizes high-quality aesthetics and smooth physics over the average quality of the massive web scrape.