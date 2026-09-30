# Vilmos Horváth — Portfolio

Plain HTML/CSS/JS portfolio. No build step. Currently placeholders only.

## Structure

| URL | File | What it is |
| --- | --- | --- |
| `/` | `index.html` | Home: welcome message, entries to Portfolio and All projects |
| `/portfolio/` | `portfolio/index.html` | Scrollable, curated list of project summaries |
| `/projects/` | `projects/index.html` | Searchable, filterable list of all projects |
| `/projects/<slug>/` | `projects/<slug>/index.html` | Individual project page |
| `/about/` | `about/index.html` | About |

Navigation bar: Home, Projects, About.

```
css/style.css         All styles; colors and fonts at the top
js/projects-data.js   The list of projects (single source for Portfolio and Projects)
js/portfolio.js       Renders featured projects on the Portfolio page
js/projects.js        Search, category chips, year/tool filters and sorting
```

## Adding a project

1. Add an entry to `js/projects-data.js` (title, summary, category, year, role, tools, `featured`).
2. Copy an existing folder in `projects/` to `projects/<slug>/` and edit the text.
3. Update the previous/next links at the bottom of the neighbouring project pages.

Set `featured: true` to also show the project on the Portfolio page. The filter options on the Projects page are built from the data automatically.

## Run locally

```
python3 -m http.server
```

Then open http://localhost:8000.
