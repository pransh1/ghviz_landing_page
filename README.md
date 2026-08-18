# ghviz landing page

The marketing/landing page for [ghviz](https://github.com/pransh1/ghviz), built with React + Vite + Tailwind CSS.

## Run it

```bash
npm i
npm start
```

Then open http://localhost:5173

## Build for production

```bash
npm run build
```

Outputs static files to `dist/` — deploy that folder anywhere (GitHub Pages, Vercel, Netlify, etc.).

## Structure

- `src/GhvizLanding.jsx` — the entire landing page (single component, Tailwind utility classes throughout)
- `src/App.jsx` — just renders `<GhvizLanding />`
- `tailwind.config.js` — scans `index.html` and everything in `src/`

## Notes

- Update the `pransh1` GitHub username throughout `GhvizLanding.jsx` if that's not the final repo owner
- The stat bar hardcodes `v0.1.0` — update on new releases
- Fonts (JetBrains Mono, Inter) load via `@import` inside the component's `<style>` tag — no extra setup needed
