import { useState, useEffect } from "react";

// Tailwind's stock palette, mapped to the same lane-color roles used in the
// real CLI output (cyan/magenta/yellow/green/blue/red/orange/purple).
// Terminal content below uses exact hex so it matches the real ANSI colors
// ghviz actually prints; page chrome uses Tailwind utility classes throughout.
const HEX = {
  cyan: "#22d3ee",
  magenta: "#e879f9",
  yellow: "#fbbf24",
  green: "#34d399",
  blue: "#60a5fa",
  red: "#f87171",
  orange: "#fb923c",
  purple: "#a78bfa",
};

const HERO_LINES = [
  { html: '<span style="color:#34d399">$</span> <span style="color:#e2e8f0">ghviz tree pransh1/ghviz --commits --limit 3</span>' },
  { html: "" },
  { html: `<span style="color:${HEX.magenta}">◆</span>  commit <span style="color:${HEX.yellow}">27227cb7757b621c9ece77e18b5f54f4d7d24f2b</span> <span style="color:${HEX.red}">(origin/HEAD, origin/main)</span>` },
  { html: `<span style="color:${HEX.cyan}">│</span>\\   Merge: fd5fe7c 54dc9dc` },
  { html: `<span style="color:${HEX.cyan}">│</span> │  Author: pransh1 &lt;mauryapransh2@gmail.com&gt;` },
  { html: `<span style="color:${HEX.cyan}">│</span> │  Date:   Fri Aug 14 14:33:22 2026 +0000` },
  { html: `<span style="color:${HEX.cyan}">│</span> │` },
  { html: `<span style="color:${HEX.cyan}">│</span> │      Enhance GitHub client and CLI for commit visualization` },
  { html: `<span style="color:${HEX.cyan}">│</span> │` },
  { html: `<span style="color:${HEX.green}">●</span>  commit <span style="color:${HEX.yellow}">54dc9dc5c04e095b003175864ed8928cac41375a</span>` },
  { html: `<span style="color:${HEX.cyan}">│</span>/   Author: pransh1 &lt;mauryapransh2@gmail.com&gt;` },
  { html: `<span style="color:${HEX.cyan}">│</span>    Date:   Fri Aug 14 14:32:09 2026 +0000` },
  { html: "" },
  { html: '<span style="color:#64748b">... 47 more commits not shown</span><span class="ghviz-cur"></span>' },
];

const SHOWCASE = {
  commits: {
    label: "tree --commits",
    lines: [
      '<span style="color:#34d399">$</span> ghviz tree pransh1/ghviz --commits',
      "",
      `<span style="color:${HEX.magenta}">◆</span>  commit 27227cb... <span style="color:${HEX.red}">(origin/HEAD, origin/main)</span>`,
      `<span style="color:${HEX.cyan}">│</span>\\   Merge: fd5fe7c 54dc9dc`,
      `<span style="color:${HEX.cyan}">│</span> │  Author: pransh1 &lt;mauryapransh2@gmail.com&gt;`,
      `<span style="color:${HEX.cyan}">│</span> │  Date:   Fri Aug 14 14:33:22 2026 +0000`,
      `<span style="color:${HEX.cyan}">│</span> │`,
      `<span style="color:${HEX.cyan}">│</span> │      Enhance GitHub client and CLI for commit visualization`,
      `<span style="color:${HEX.green}">●</span>  commit 54dc9dc...`,
      `<span style="color:${HEX.cyan}">│</span>/   Author: pransh1 &lt;mauryapransh2@gmail.com&gt;`,
    ],
  },
  tree: {
    label: "tree",
    lines: [
      '<span style="color:#34d399">$</span> ghviz tree pransh1/ghviz',
      "",
      `<span style="color:${HEX.cyan}">ghviz</span>`,
      `├── <span style="color:${HEX.blue}">ghviz/</span>`,
      `│   ├── <span style="color:${HEX.blue}">api/</span>`,
      "│   │   ├── github_client.py",
      "│   │   └── local_git.py",
      `│   ├── <span style="color:${HEX.blue}">render/</span>`,
      "│   │   ├── graph_render.py",
      "│   │   └── tree_render.py",
      "│   └── cli.py",
      `├── <span style="color:${HEX.blue}">tests/</span>`,
      "├── pyproject.toml",
      "└── README.md",
    ],
  },
  stats: {
    label: "stats",
    lines: [
      '<span style="color:#34d399">$</span> ghviz stats torvalds',
      "",
      `<span style="color:${HEX.blue}">┌─ GitHub Stats ──────────────────────────┐</span>`,
      `<span style="color:${HEX.blue}">│</span> torvalds  •  <span style="color:${HEX.cyan}">7</span> repos  •  <span style="color:${HEX.green}">227k</span> followers <span style="color:${HEX.blue}">│</span>`,
      `<span style="color:${HEX.blue}">└─────────────────────────────────────────┘</span>`,
      "",
      `<span style="color:${HEX.magenta}">Language Breakdown</span>`,
      `C            <span style="color:${HEX.cyan}">████████████████████</span> 78.2%`,
      `Shell        <span style="color:${HEX.cyan}">███</span> 11.4%`,
      `Python       <span style="color:${HEX.cyan}">█</span> 4.1%`,
    ],
  },
  local: {
    label: "stats --local",
    lines: [
      '<span style="color:#34d399">$</span> ghviz stats --local',
      "",
      `<span style="color:${HEX.blue}">┌─ Local Repo Stats ───────────────────────────────┐</span>`,
      `<span style="color:${HEX.blue}">│</span> ghviz (local)  •  <span style="color:${HEX.cyan}">42</span> commits  •  <span style="color:${HEX.green}">2</span> contributors <span style="color:${HEX.blue}"> │</span>`,
      `<span style="color:${HEX.blue}">└──────────────────────────────────────────────────┘</span>`,
      "",
      `<span style="color:${HEX.magenta}">Top Contributors</span>`,
      "pransh1           38   90.5%",
      "Second Author      4    9.5%",
      "",
      `<span style="color:${HEX.green}">Commit Activity (by month)</span>`,
      `2026-08  <span style="color:${HEX.green}">██████████████████</span> 42`,
    ],
  },
};

const FEATURES = [
  { glyph: "◆", tw: "text-cyan-400 border-cyan-400 bg-cyan-400/10", title: "Multi-lane commit graphs", body: "Real branch/merge lane tracking with open (\\) and close (/) transitions — not just a flat commit list with colors slapped on." },
  { glyph: "⇄", tw: "text-emerald-400 border-emerald-400 bg-emerald-400/10", title: "Remote or local", body: "Look up any public repo from anywhere with no clone, or point --local at a repo you already have for zero rate limits." },
  { glyph: "◎", tw: "text-orange-400 border-orange-400 bg-orange-400/10", title: "Real HEAD, real branches", body: "Local mode reads your actual .git — accurate HEAD -> branch decorations the GitHub API can never give you." },
  { glyph: "▤", tw: "text-amber-400 border-amber-400 bg-amber-400/10", title: "Stats & language breakdown", body: "Top repos, followers, contributors, and a byte-weighted language bar chart — for any user or your local repo." },
  { glyph: "▣", tw: "text-blue-400 border-blue-400 bg-blue-400/10", title: "File trees that fit your terminal", body: "Nested, colored directory trees that reflow correctly when you resize the window — same as native git output." },
  { glyph: "✓", tw: "text-violet-400 border-violet-400 bg-violet-400/10", title: "Tested, open source", body: "The lane algorithm ships with real test coverage, including integration tests against actual git repos. MIT licensed." },
];

const INSTALL_TABS = {
  pipx: {
    label: "pipx (all platforms)",
    commands: [{ prompt: "$", text: "pipx install ghviz" }],
    note: "Works identically on macOS, Linux, and Windows. No pipx? Run python3 -m pip install --user pipx && pipx ensurepath first.",
  },
  // brew: {
  //   label: "Homebrew",
  //   commands: [{ prompt: "$", text: "brew install pransh1/ghviz/ghviz" }],
  //   note: "Installs from the ghviz tap — one command, macOS or Linuxbrew.",
  // },
  windows: {
    label: "Windows",
    commands: [
      { prompt: ">", text: "py -m pip install --user pipx" },
      { prompt: ">", text: "py -m pipx ensurepath" },
      { prompt: ">", text: "pipx install ghviz" },
    ],
    note: "Close and reopen your terminal after ensurepath — PATH changes need a fresh window on Windows.",
  },
  // source: {
  //   label: "From source",
  //   commands: [
  //     { prompt: "$", text: "git clone https://github.com/pransh1/ghviz.git && cd ghviz" },
  //     { prompt: "$", text: 'pip install -e ".[dev]"' },
  //   ],
  //   note: "Run pytest -v to run the full test suite.",
  // },
};

function legacyCopy(text) {
  return new Promise((resolve, reject) => {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      const ok = document.execCommand("copy");
      ok ? resolve() : reject(new Error("execCommand copy failed"));
    } catch (err) {
      reject(err);
    } finally {
      document.body.removeChild(ta);
    }
  });
}

function copyText(text) {
  if (navigator.clipboard && window.isSecureContext) {
    return navigator.clipboard.writeText(text).catch(() => legacyCopy(text));
  }
  return legacyCopy(text);
}

function CopyButton({ text, id, copiedId, setCopiedId }) {
  const copied = copiedId === id;
  return (
    <button
      onClick={() => {
        copyText(text).then(() => {
          setCopiedId(id);
          setTimeout(() => setCopiedId((cur) => (cur === id ? null : cur)), 1600);
        });
      }}
      className={`flex-shrink-0 font-mono text-xs px-2.5 py-1.5 rounded-md border transition-colors ${
        copied
          ? "text-emerald-400 border-emerald-400"
          : "text-slate-500 border-slate-700 hover:text-slate-200 hover:border-slate-500"
      }`}
    >
      {copied ? "copied ✓" : "copy"}
    </button>
  );
}

export default function GhvizLanding() {
  const [installTab, setInstallTab] = useState("pipx");
  const [showcaseTab, setShowcaseTab] = useState("commits");
  const [copiedId, setCopiedId] = useState(null);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const handler = (e) => setReduceMotion(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  const activeInstall = INSTALL_TABS[installTab];
  const activeShowcase = SHOWCASE[showcaseTab];

  const tabClass = (active) =>
    `font-mono text-sm px-4 py-3 whitespace-nowrap border-b-2 transition-colors ${
      active ? "text-cyan-400 border-cyan-400" : "text-slate-500 border-transparent hover:text-slate-300"
    }`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-400 selection:text-slate-950">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700;800&family=Inter:wght@400;500;600;700&display=swap');
        .ghviz-mono { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .ghviz-sans { font-family: 'Inter', -apple-system, sans-serif; }
        @keyframes ghviz-reveal { from { opacity: 0; } to { opacity: 1; } }
        @keyframes ghviz-blink { 50% { opacity: 0; } }
        .ghviz-term-line { white-space: pre; opacity: 0; animation: ghviz-reveal 0.25s ease forwards; }
        .ghviz-term-line.ghviz-no-anim { opacity: 1; animation: none; }
        .ghviz-cur { display: inline-block; width: 7px; height: 15px; background: #22d3ee; vertical-align: text-bottom; animation: ghviz-blink 1s step-end infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ghviz-term-line { animation: none !important; opacity: 1 !important; }
          .ghviz-cur { animation: none !important; }
        }
      `}</style>

      {/* ambient grid backdrop */}
      <div
        className="fixed inset-0 opacity-30 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(#1a2029 1px, transparent 1px), linear-gradient(90deg, #1a2029 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, black 0%, transparent 70%)",
        }}
      />

      {/* ============ NAV ============ */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-slate-950/80 border-b border-slate-800/60">
        <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
          <a href="#top" className="ghviz-mono flex items-center gap-2.5 font-bold text-base">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" style={{ boxShadow: "0 0 12px #22d3ee" }} />
            ghviz
          </a>
          <div className="hidden sm:flex items-center gap-7 text-sm text-slate-400">
            <a href="#features" className="hover:text-slate-100 transition-colors">Features</a>
            <a href="#install" className="hover:text-slate-100 transition-colors">Install</a>
            <a href="#showcase" className="hover:text-slate-100 transition-colors">Showcase</a>
            <a href="https://github.com/pransh1/ghviz" target="_blank" rel="noopener noreferrer" className="hover:text-slate-100 transition-colors">GitHub</a>
          </div>
          <a href="#install" className="ghviz-mono text-sm font-medium bg-slate-100 text-slate-950 px-4 py-2 rounded-md hover:bg-cyan-400 hover:-translate-y-0.5 transition-all">
            $ get started
          </a>
        </div>
      </nav>

      <main className="relative z-10">
        {/* ============ HERO ============ */}
        <section id="top" className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
          <div className="ghviz-mono inline-flex items-center gap-2 text-sm text-emerald-400 bg-emerald-400/10 border border-emerald-400/25 px-3.5 py-1.5 rounded-full mb-7">
            <span style={{ fontSize: "10px" }}>●</span> terminal-native · works with any public repo
          </div>

          <h1 className="ghviz-mono font-extrabold text-6xl sm:text-7xl tracking-tight mb-6">
            gh<span className="text-cyan-400">viz</span>
          </h1>

          <p className="ghviz-sans text-lg sm:text-xl text-slate-400 max-w-xl mx-auto mb-10">
            See any GitHub repo's file tree and commit graph {"  "}
            {/* <code className="ghviz-mono bg-slate-900 border border-slate-800 text-amber-400 px-2 py-0.5 rounded text-base">
              git log --graph
            </code>{" "} */}
            right in your terminal. No browser tab required.
          </p>

          <div className="flex gap-3.5 justify-center flex-wrap mb-16">
            <a href="#install" className="ghviz-mono text-sm font-medium bg-cyan-400 text-slate-950 px-5 py-3 rounded-lg hover:-translate-y-0.5 transition-transform">
              $ pipx install ghviz
            </a>
            <a
              href="https://github.com/pransh1/ghviz"
              target="_blank"
              rel="noopener noreferrer"
              className="ghviz-mono text-sm font-medium bg-slate-900 border border-slate-800 text-slate-100 px-5 py-3 rounded-lg hover:border-slate-600 hover:-translate-y-0.5 transition-all"
            >
              view on github ↗
            </a>
          </div>

          {/* signature terminal window */}
          <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-xl overflow-hidden text-left shadow-2xl shadow-black/50">
            <div className="flex items-center gap-2 px-4 py-3 bg-slate-800/60 border-b border-slate-800">
              <span className="w-2.5 h-2.5 rounded-full bg-fuchsia-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
              <span className="w-2.5 h-2.5 rounded-full bg-violet-400" />
              <span className="ghviz-mono text-xs text-slate-500 ml-2">ghviz — ~/projects/ghviz</span>
            </div>
            <div className="ghviz-mono text-sm leading-relaxed p-5" style={{ minHeight: "330px" }}>
              {HERO_LINES.map((line, i) => (
                <div
                  key={i}
                  className={`ghviz-term-line ${reduceMotion ? "ghviz-no-anim" : ""}`}
                  style={reduceMotion ? undefined : { animationDelay: `${i * 0.09}s` }}
                  dangerouslySetInnerHTML={{ __html: line.html || "&nbsp;" }}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ============ STAT BAR ============ */}
        {/* <div className="ghviz-mono flex flex-wrap justify-center gap-x-7 gap-y-2 py-7 text-sm text-slate-500 border-y border-slate-800/60">
          <span><strong className="text-slate-300 font-semibold">MIT</strong> License</span>
          <span>macOS · Linux · Windows</span>
          <span>Python <strong className="text-slate-300 font-semibold">3.9+</strong></span>
          <span>remote + local modes</span>
          <span><strong className="text-slate-300 font-semibold">v0.1.0</strong></span>
        </div> */}

        {/* ============ WHAT IS ============ */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <p className="ghviz-sans max-w-2xl mx-auto text-center text-lg text-slate-400 leading-relaxed">
            ghviz is built for developers who want to check a repo without leaving the terminal.
            Point it at any public GitHub repo —{" "}
            <code className="ghviz-mono text-cyan-400 text-base">ghviz tree torvalds/linux --commits</code> —
            and get a full multi-lane commit graph, no clone required.
            Run it with <code className="ghviz-mono text-cyan-400 text-base">--local</code> inside a repo you already have,
            and it reads your real <code className="ghviz-mono text-cyan-400 text-base">.git</code> directly: accurate{" "}
            <code className="ghviz-mono text-cyan-400 text-base">HEAD</code>, real branch names, no rate limits.
          </p>
        </section>

        {/* ============ FEATURES ============ */}
        <section id="features" className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-xl mx-auto text-center mb-14">
            <div className="ghviz-mono text-sm text-slate-500 mb-3">// features</div>
            <h2 className="ghviz-mono font-bold text-2xl sm:text-3xl tracking-tight">
              Everything git log --graph does. In color. Everywhere.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-slate-800/60 border border-slate-800/60 rounded-2xl overflow-hidden">
            {FEATURES.map((f) => (
              <div key={f.title} className="bg-slate-900 hover:bg-slate-800/60 transition-colors p-8">
                <div className={`ghviz-mono w-9 h-9 rounded-lg border flex items-center justify-center font-bold text-base mb-5 ${f.tw}`}>
                  {f.glyph}
                </div>
                <h3 className="ghviz-sans font-semibold text-base mb-2.5">{f.title}</h3>
                <p className="ghviz-sans text-sm text-slate-400 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ============ INSTALL ============ */}
        <section id="install" className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-xl mx-auto text-center mb-14">
            <div className="ghviz-mono text-sm text-slate-500 mb-3">$ install ghviz</div>
            <h2 className="ghviz-mono font-bold text-2xl sm:text-3xl tracking-tight">One command. Every platform.</h2>
          </div>

          <div className="max-w-xl mx-auto bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="flex overflow-x-auto bg-slate-800/40 border-b border-slate-800" role="tablist">
              {Object.entries(INSTALL_TABS).map(([key, tab]) => (
                <button key={key} role="tab" aria-selected={installTab === key} onClick={() => setInstallTab(key)} className={tabClass(installTab === key)}>
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="p-6">
              {activeInstall.commands.map((c, i) => (
                <div key={i} className="ghviz-mono flex items-center justify-between gap-3 bg-slate-950 border border-slate-800 rounded-lg px-3.5 py-3 text-sm mb-2.5 last:mb-0">
                  <span className="overflow-x-auto">
                    <span className="text-slate-500">{c.prompt} </span>
                    {c.text}
                  </span>
                  <CopyButton text={c.text} id={`${installTab}-${i}`} copiedId={copiedId} setCopiedId={setCopiedId} />
                </div>
              ))}
              <p className="ghviz-sans text-sm text-slate-500 mt-4 leading-relaxed">{activeInstall.note}</p>
            </div>
          </div>
        </section>

        {/* ============ SHOWCASE ============ */}
        <section id="showcase" className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-xl mx-auto text-center mb-14">
            <div className="ghviz-mono text-sm text-slate-500 mb-3">$ ghviz --showcase</div>
            <h2 className="ghviz-mono font-bold text-2xl sm:text-3xl tracking-tight">Four commands, one tool</h2>
          </div>

          <div className="max-w-2xl mx-auto bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="flex overflow-x-auto bg-slate-800/40 border-b border-slate-800" role="tablist">
              {Object.entries(SHOWCASE).map(([key, tab]) => (
                <button key={key} role="tab" aria-selected={showcaseTab === key} onClick={() => setShowcaseTab(key)} className={tabClass(showcaseTab === key)}>
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="ghviz-mono text-sm leading-relaxed p-6" style={{ minHeight: "280px" }}>
              {activeShowcase.lines.map((line, i) => (
                <div key={i} dangerouslySetInnerHTML={{ __html: line || "&nbsp;" }} className="whitespace-pre" />
              ))}
            </div>
          </div>
        </section>

        {/* ============ CTA ============ */}
        <section className="max-w-6xl mx-auto px-6 py-20">
          <div className="max-w-2xl mx-auto text-center bg-slate-900 border border-slate-800 rounded-2xl px-8 py-16">
            <div className="ghviz-mono text-amber-400 text-xl mb-4 tracking-widest">★ ★ ★ ★ ★</div>
            <h2 className="ghviz-mono font-bold text-2xl sm:text-3xl mb-3">Open source. Built in the terminal, for the terminal.</h2>
            <p className="ghviz-sans text-slate-400 mb-8">MIT licensed. Issues, PRs, and feedback are always welcome.</p>
            <div className="flex gap-3.5 justify-center flex-wrap">
              <a href="https://github.com/pransh1/ghviz" target="_blank" rel="noopener noreferrer" className="ghviz-mono text-sm font-medium bg-cyan-400 text-slate-950 px-5 py-3 rounded-lg hover:-translate-y-0.5 transition-transform">
                star on github
              </a>
              <a href="https://pypi.org/project/ghviz/" target="_blank" rel="noopener noreferrer" className="ghviz-mono text-sm font-medium bg-slate-950 border border-slate-800 text-slate-100 px-5 py-3 rounded-lg hover:border-slate-600 hover:-translate-y-0.5 transition-all">
                view on pypi ↗
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* ============ FOOTER ============ */}
      <footer className="border-t border-slate-800/60 py-10">
        <div className="max-w-6xl mx-auto px-6 flex flex-wrap items-center justify-between gap-4 text-sm text-slate-500">
          <div>
            ghviz · MIT License · by{" "}
            <a href="https://github.com/pransh1" className="text-slate-400 hover:text-slate-200 transition-colors">PRANSH MAURYA</a>
          </div>
          <div className="flex gap-5 flex-wrap">
            <a href="https://github.com/pransh1/ghviz" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">GitHub</a>
            {/* <a href="https://pypi.org/project/ghviz/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">PyPI</a> */}
            <a href="#install" className="hover:text-slate-300 transition-colors">Install</a>
            <a href="https://github.com/pransh1/ghviz/issues" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300 transition-colors">Issues</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
