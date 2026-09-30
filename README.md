# Portfolio

Plain HTML/CSS/JS portfolio (migrated from Framer). No build step.

## Structure

```
index.html                            Home: hero, work grid, about, contact
projects/seldom-and-shade/index.html  Case study page (same URL path as on Framer)
css/style.css                         All styles; design tokens at the top
js/main.js                            Sticky nav, mobile menu, scroll reveal
assets/images/                        Put project images here
```

## Editing

- Colors, fonts, spacing: change the variables in `:root` at the top of `css/style.css`.
- New project: copy `projects/seldom-and-shade/` to `projects/<name>/`, then add a card in the work grid in `index.html`.
- Images: replace a `<div class="placeholder">` with `<img src="..." alt="...">`.

## Run locally

```
python3 -m http.server
```

Then open http://localhost:8000.

## Hosting

Works as-is on GitHub Pages (Settings → Pages → deploy from branch), Netlify or Vercel.
