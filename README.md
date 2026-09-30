# Vilmos Horváth — Portfolio

Bilingual (English / Hungarian) portfolio built with [Jekyll](https://jekyllrb.com/), which GitHub Pages builds automatically on every push. Currently placeholders only.

## URLs

| English | Hungarian | Page |
| --- | --- | --- |
| `/en/` | `/hu/` | Home: welcome message, entries to Portfolio and All projects |
| `/en/portfolio/` | `/hu/portfolio/` | Scrollable, curated list of project summaries |
| `/en/projects/` | `/hu/projects/` | Searchable, filterable list of all projects |
| `/en/projects/<slug>/` | `/hu/projects/<slug>/` | Individual project page |
| `/en/about/` | `/hu/about/` | About |

The root address (`/portfolio/`) sends visitors to `/en/` or `/hu/`: the language they last picked with the EN / HU switch, otherwise their browser's language.

## Where things live

```
_config.yml           Site settings (base URL, languages)
_data/i18n/en.yml     All English interface text (nav, buttons, labels, …)
_data/i18n/hu.yml     All Hungarian interface text; same keys as en.yml
_layouts/             Page templates, shared by both languages
	default.html      Header (navigation, language switch), footer
	home.html, portfolio.html, projects.html, about.html, project.html
_projects/en/         One Markdown file per project, English
_projects/hu/         One Markdown file per project, Hungarian (same file names)
en/, hu/              Tiny files that pick a layout for each page
css/style.css         All styles
js/projects.js        Search, filters and sorting on the Projects page
js/site.js            Mobile menu; remembers the language chosen with the switch
index.html            Root redirect to /en/ or /hu/
```

## Changing text

- Navigation, buttons, headings and other interface text: edit `_data/i18n/en.yml` and `_data/i18n/hu.yml`.
- A project's text: edit its file in `_projects/en/` and `_projects/hu/`.

## Adding a project

1. Copy a file in `_projects/en/` and give it a new name, e.g. `my-game.md`. The file name becomes the URL: `/en/projects/my-game/`.
2. Fill in the front matter (between the `---` lines):
	- `title`, `summary`, `role`: text shown on cards and the project page
	- `order`: position in lists and previous/next links (1 = first)
	- `category`: `game-design`, `ui-ux` or `creative` (labels come from the i18n files; add new ones there)
	- `year`, `tools`, `featured` (`true` = also shown on the Portfolio page)
	- `image`: optional cover/thumbnail path, e.g. `/assets/images/my-game/cover.jpg`
3. Write the project text below the front matter in Markdown.
4. Create the same file name in `_projects/hu/` with the Hungarian text. Keep `order`, `category`, `year`, `tools` and `featured` the same.

Filter options on the Projects page are built from the projects automatically.

## Preview locally (optional)

Pushing to GitHub is enough; the live site updates about a minute later. To preview on your own computer first, install Ruby, then:

```
bundle install
bundle exec jekyll serve
```

and open http://localhost:4000/portfolio/.
