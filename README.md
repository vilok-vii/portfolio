# Vilmos Horváth — Portfolio

Plain HTML/CSS portfolio, migrated from Framer. No build step, no JavaScript.

## Pages

| URL | File |
| --- | --- |
| `/` | `index.html` (welcome + sticky-note cards) |
| `/projects/` | `projects/index.html` (project list) |
| `/projects/seldom-and-shade/` | `projects/seldom-and-shade/index.html` |
| `/projects/woolhalla/` | `projects/woolhalla/index.html` |
| `/ui-ux-portfolio/` | `ui-ux-portfolio/index.html` |

URLs match the old Framer site.

## Styling

Everything lives in `css/style.css`:

- Fonts: Lilita One (titles), Exo (subtitle), Inter (body), loaded from Google Fonts.
- Page themes: add `class="theme-slate"` or `class="theme-blue"` to `<body>` for a project page background. Add a new theme by copying one of the `.theme-*` blocks.
- `assets/images/` holds the paper textures, torn header strip and the Seldom & Shade stickers.

## Adding a project

1. Copy `projects/woolhalla/` to `projects/<name>/` and edit the text.
2. Add it to the list in `projects/index.html`.
3. Update the ‹ / › links at the bottom of the neighbouring project pages.

## Run locally

```
python3 -m http.server
```

Then open http://localhost:8000.

## Hosting

Works as-is on GitHub Pages (Settings → Pages → deploy from branch), Netlify or Vercel.
