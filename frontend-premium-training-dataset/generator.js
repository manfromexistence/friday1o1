/**
 * High-Scale Combinatorial Synthesizer for AI Fine-Tuning.
 * Generates high-quality HTML/CSS/JS frontend examples
 * and streams them directly into an Instruction/Output JSONL file.
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_FILE = path.join(__dirname, 'ai_finetune_data.jsonl');
const TARGET_ROWS = 5000; // Small subset to avoid Git blob limits

// Combinatorial building blocks
const components = {
  layouts: [
    { name: 'Dashboard', html: '<div class="dashboard"><aside class="sidebar">[SIDEBAR]</aside><main class="content">[MAIN]</main></div>' },
    { name: 'Landing Page', html: '<div class="landing"><header class="hero">[HERO]</header><section class="features">[FEATURES]</section></div>' },
    { name: 'Portfolio Profile', html: '<div class="portfolio"><div class="avatar-header">[AVATAR]</div><div class="gallery">[GALLERY]</div></div>' }
  ],
  colors: [
    { theme: 'Midnight', bg: '#0f172a', text: '#f8fafc', primary: '#3b82f6', secondary: '#8b5cf6' },
    { theme: 'Neon Cyber', bg: '#000000', text: '#00ffcc', primary: '#ff00ff', secondary: '#00ffff' },
    { theme: 'Minimalist Light', bg: '#ffffff', text: '#09090b', primary: '#18181b', secondary: '#71717a' },
    { theme: 'Forest Glass', bg: '#064e3b', text: '#ecfdf5', primary: '#10b981', secondary: '#34d399' }
  ],
  interactions: [
    { name: 'Spring Scroll', trigger: 'IntersectionObserver', effect: 'transform: translateY(0); opacity: 1; transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);', js: 'const observer = new IntersectionObserver(e => e.forEach(i => { if(i.isIntersecting) i.target.classList.add("visible"); })); document.querySelectorAll(".animate-target").forEach(el => observer.observe(el));' },
    { name: 'Glassmorphism Hover Tilt', trigger: 'mousemove', effect: 'backdrop-filter: blur(20px); transition: transform 0.2s; &:hover { transform: perspective(1000px) rotateX(10deg) rotateY(10deg); }', js: 'document.querySelectorAll(".glass-card").forEach(c => c.addEventListener("mousemove", e => { const x = (window.innerWidth / 2 - e.pageX) / 25; const y = (window.innerHeight / 2 - e.pageY) / 25; c.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${y}deg)`; }));' }
  ]
};

// Utilities
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

function synthesizeExample() {
  const layout = getRandom(components.layouts);
  const color = getRandom(components.colors);
  const interaction = getRandom(components.interactions);

  // Synthesize HTML structure
  let bodyHTML = layout.html
    .replace('[SIDEBAR]', `<ul><li>Home</li><li>Analytics</li><li>Settings</li></ul>`)
    .replace('[MAIN]', `<div class="glass-card animate-target"><h2>Overview</h2><p>Premium generated content.</p></div>`)
    .replace('[HERO]', `<h1>Welcome to ${color.theme}</h1><button class="primary-btn">Get Started</button>`)
    .replace('[FEATURES]', `<div class="grid"><div class="glass-card animate-target">Feature 1</div><div class="glass-card animate-target">Feature 2</div></div>`)
    .replace('[AVATAR]', `<div class="glass-card">Profile</div>`)
    .replace('[GALLERY]', `<div class="animate-target">Project 1</div><div class="animate-target">Project 2</div>`);

  // Synthesize CSS
  const css = `
    :root {
      --bg: ${color.bg};
      --text: ${color.text};
      --primary: ${color.primary};
      --secondary: ${color.secondary};
    }
    body { background-color: var(--bg); color: var(--text); font-family: system-ui; margin: 0; padding: 2rem; }
    .glass-card { background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); padding: 2rem; border-radius: 1rem; ${interaction.effect} }
    .animate-target { opacity: 0; transform: translateY(50px); }
    .animate-target.visible { ${interaction.effect} }
    .primary-btn { cursor: pointer; display: inline-block; padding: 1rem 2rem; background: var(--primary); color: var(--bg); border-radius: 0.5rem; border: none; }
  `;

  const finalHTML = `<!DOCTYPE html><html lang="en"><head><style>${css}</style></head><body>${bodyHTML}<script>${interaction.js}</script></body></html>`;

  // Create Fine-Tuning Instruction
  const instruction = `Build a high-quality modern HTML/CSS/JS frontend using the '${layout.name}' pattern. Style it with a '${color.theme}' color palette. Implement advanced '${interaction.name}' animations using vanilla JavaScript and CSS. Ensure it is fully self-contained in a single file.`;

  return { instruction, output: finalHTML };
}

console.log(`Starting synthesis of ${TARGET_ROWS.toLocaleString()} premium examples...`);
const writeStream = fs.createWriteStream(OUTPUT_FILE);

for (let i = 0; i < TARGET_ROWS; i++) {
  const example = synthesizeExample();
  writeStream.write(JSON.stringify(example) + '\n');
}

writeStream.end(() => {
  console.log(`Finished writing ${TARGET_ROWS.toLocaleString()} rows to ${OUTPUT_FILE}`);
});