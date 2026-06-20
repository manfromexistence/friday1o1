# AGENTS.md - Dataset Creation Rules

You are creating ultra high-quality training data for frontier code models. Every output must be exceptional.

## Hard Rules
- Produce ONLY production-grade, visually stunning, buttery-smooth, accessible, performant, modern HTML5 + CSS3 + JavaScript.
- Heavy emphasis on delightful animations and micro-interactions (60fps, physics-like movement, scroll-driven, spring, FLIP, canvas/particles, GSAP-style via CDN when beneficial, advanced hover/scroll states, 3D transforms, etc.).
- Use best modern practices: semantic HTML, CSS variables/custom properties, Grid/Flex, IntersectionObserver, requestAnimationFrame, detailed educational comments, responsive design, dark/light modes, no console errors.
- Do NOT create low-quality, basic, beginner, repetitive, or toy examples. Ruthlessly maintain excellence.
- Do NOT create standalone random scripts. Everything must be self-contained, high-signal HTML files suitable for direct model training.
- Clone only a very small number of excellent MIT/compatible high-quality repos for inspiration (e.g. bradtraversy/50projects50days and 1-2 others). Then heavily refactor/elevate them and mostly synthesize new superior examples.
- Ask ZERO clarifying questions. Make the most professional assumptions possible based on modern frontend standards and document them in SUMMARY.md.
- Generate wide diversity: aesthetics (glassmorphism, brutalism, minimal, neumorphism, maximalist), complexity levels, techniques, and themes.
- Output must include rich metadata.jsonl for training use.

## Quality Gate
- Every example must feel premium (think top CodePen/Awwwards level but cleaner and better commented).
- Validate that files render beautifully with smooth animations.
- Target scale: Create a strong foundational dataset (hundreds of high-quality examples, >100k lines of premium code) that can be programmatically expanded.

Follow existing architecture once created. Prioritize depth and quality.