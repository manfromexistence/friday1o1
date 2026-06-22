# Ultimate AI Frontend Training Data Sources

To scale this foundational dataset to millions of rows, do not scrape GitHub indiscriminately. Instead, utilize the following highly-curated, high-signal sources. All listed sources possess permissive licensing (MIT, Apache 2.0, or Open RAIL) suitable for commercial model fine-tuning.

This document organizes datasets into a strict taxonomy to ensure your 50M+ parameter model learns structure, interaction, and aesthetics perfectly.

---

## 1. Multimodal & Vision-to-Code Datasets
The modern standard for generating frontend code relies on pairing visual contexts (screenshots, wireframes) with code structure.

*   **HuggingFaceM4/WebSight:**
    *   **Focus:** Specifically built for Vision-Language Models. Contains over 2 million structured HTML/CSS pairs aligned with synthetically generated web screenshots.
    *   **Link:** `https://huggingface.co/datasets/HuggingFaceM4/WebSight`
*   **SALT-NLP/Design2Code:**
    *   **Focus:** State-of-the-art benchmark and dataset for converting high-fidelity visual designs into functional HTML/CSS.
    *   **Link:** `https://huggingface.co/datasets/SALT-NLP/Design2Code`
*   **SALT-NLP/Sketch2Code & N0zomu/pix2code-data:**
    *   **Focus:** Classic, structured datasets for translating low-fidelity hand-drawn wireframes and raw UI images into Domain Specific Languages (DSL) and HTML/CSS.
    *   **Links:**
        *   `https://huggingface.co/datasets/SALT-NLP/Sketch2Code`
        *   `https://huggingface.co/datasets/N0zomu/pix2code-data`

## 2. Web Agents & Interactive Navigation (NEW)
To build a model that understands *how* a user interacts with the DOM (clicking, typing, state changes), you must include datasets mapping DOM states to interactive actions.

*   **osunlp/Mind2Web:**
    *   **Focus:** Contains millions of actions across thousands of websites, mapping exact DOM states to user actions. Critical for teaching the model how buttons, forms, and JS actually function.
    *   **Link:** `https://huggingface.co/datasets/osunlp/Mind2Web`
*   **DLIlab/webarena_two_shot_instructions:**
    *   **Focus:** Based on the WebArena benchmark, this provides highly realistic, complex web navigation tasks and instructions for building autonomous web agents.
    *   **Link:** `https://huggingface.co/datasets/DLIlab/webarena_two_shot_instructions`
*   **X-LANCE/WebSRC_v1.0:**
    *   **Focus:** A massive dataset for Web-based Structural Reading Comprehension. Teaches the model to deeply understand the semantic relationship between DOM elements.
    *   **Link:** `https://huggingface.co/datasets/X-LANCE/WebSRC_v1.0`
*   **pinkmooncake/rico-screen2words:**
    *   **Focus:** Based on the massive Rico UI dataset, this provides rich, natural language captions for UI screens, mapping visual hierarchies to textual descriptions.
    *   **Link:** `https://huggingface.co/datasets/pinkmooncake/rico-screen2words`

## 3. Instruction-Tuning UI Datasets
Crucial for chat-based models that need to respond to conversational UI generation requests.

*   **TIGER-Lab/WebInstructSub:**
    *   **Focus:** High-quality instruction-tuning data for web programming. Features step-by-step reasoning for building UIs.
    *   **Link:** `https://huggingface.co/datasets/TIGER-Lab/WebInstructSub`

## 4. Component-Level & Framework Datasets
Modern frontends heavily rely on component architectures and utility classes (Tailwind).

*   **sk1502/ui-components-finetune:**
    *   **Focus:** Highly targeted, isolated UI components specifically formatted for instruction-tuning LLMs to output clean, modular components rather than full pages.
    *   **Link:** `https://huggingface.co/datasets/sk1502/ui-components-finetune`
*   **Eim/tailwind-html & Reubencf/frontend-html-tailwind-js:**
    *   **Focus:** Massive scrapes of pure Tailwind CSS architecture. Teaches the model semantic utility class combinations.
    *   **Links:**
        *   `https://huggingface.co/datasets/Eim/tailwind-html`
        *   `https://huggingface.co/datasets/Reubencf/frontend-html-tailwind-js`

## 5. Massive Pre-compiled Code Datasets
For pure code-completion bulk, use datasets that have already done massive deduplication and PII redaction on GitHub code.

*   **BigCode / The Stack v2:**
    *   **Focus:** The absolute gold standard for code LLMs. Over 3 Terabytes of frontend code. Filter specifically for `HTML`, `CSS`, and `JavaScript`.
    *   **Link:** `https://huggingface.co/datasets/bigcode/the-stack-v2`
*   **khoomeik/gzipscale-code-html-256M:**
    *   **Focus:** Massive scale HTML specifically formatted and chunked for optimal compression and LLM training ingestion.
    *   **Link:** `https://huggingface.co/datasets/khoomeik/gzipscale-code-html-256M`

## 6. Premium Open-Source UI Libraries
To teach a model "good taste" (modern aesthetics, glassmorphism, 60fps animations), augment the massive datasets above by heavily over-indexing the source code of these premium libraries:

*   **Tailwind UI (Free Tiers) / Headless UI:** `https://github.com/tailwindlabs/headlessui`
*   **Radix UI / Shadcn UI:** `https://github.com/radix-ui/primitives`
*   **Framer Motion & GSAP:**
    *   `https://github.com/framer/motion`
    *   `https://github.com/greensock/GSAP`

---

## Strategy for 50 Million Scale

1.  Download **WebSight** (for structural layout logic), **Mind2Web & WebArena** (for interactive DOM mapping), and the HTML subset of **The Stack v2** (for raw DOM diversity).
2.  Run a strict heuristic filter over them (reject files >100kb, reject minified `.min.js` files, reject files without standard formatting).
3.  Combine the filtered massive dataset with the premium examples located in this repository's `full-pages` and `animation-showcases` directories.
4.  Weight the premium examples and the Framer Motion repos heavily (e.g., duplicate them 10x in the JSONL) so the model prioritizes high-quality aesthetics and smooth physics over the average quality of the massive web scrape.