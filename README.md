# Vilmos Horváth — Portfolio

Bilingual (English / Hungarian) portfolio built with [Jekyll](https://jekyllrb.com/), which GitHub Pages builds automatically on every push. Currently placeholders only.

## URLs

| English | Hungarian | Page |
| --- | --- | --- |
| `/en/` | `/hu/` | Home: intro (who I am, what I do), selected work, link to all projects |
| `/en/portfolio/` | `/hu/portfolio/` | Old address; redirects to the selected work on the home page |
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
	home.html, projects.html, about.html, project.html
_projects/en/         One Markdown file per project, English
_projects/hu/         One Markdown file per project, Hungarian (same file names)
en/, hu/              Tiny files that pick a layout for each page
css/style.css         All styles; palette and grain at the top
assets/images/        Images (noise.png = grain texture)
js/projects.js        Search, filters and sorting on the Projects page
js/site.js            Mobile menu; remembers the language chosen with the switch
index.html            Root redirect to /en/ or /hu/
```

## Colours and grain

At the top of `css/style.css`:

- `--red`, `--orange`, `--cream`, `--teal`, `--ink`: the palette. All other colours (backgrounds, lines, tints, buttons) are derived from these, so changing them restyles the whole site.
- `--grain-opacity`: strength of the film-grain texture (`assets/images/noise.png`) laid over the page. `0` turns it off.
- Dark-mode colours are in the `:root[data-theme="dark"]` block just below. The site starts in light mode; visitors switch with the moon/sun button next to the language button, and their choice is remembered.

## Changing text

- Navigation, buttons, headings and other interface text: edit `_data/i18n/en.yml` and `_data/i18n/hu.yml`.
- A project's text: edit its file in `_projects/en/` and `_projects/hu/`.

## Adding a project

1. Copy a file in `_projects/en/` and give it a new name, e.g. `my-game.md`. The file name becomes the URL: `/en/projects/my-game/`.
2. Fill in the front matter (between the `---` lines):
	- `title`, `summary`, `role`: text shown on cards and the project page
	- `order`: position in lists and previous/next links (1 = first)
	- `category`: `tech-design`, `game-design`, `ui-ux` or `creative` (labels come from the i18n files; add new ones there)
	- `year`, `tools`, `featured` (`true` = also shown under Selected work on the home page)
	- `image`: optional cover/thumbnail path, e.g. `/assets/images/my-game/cover.jpg`
	- `video`: optional YouTube video ID (the part after `youtu.be/`), shown instead of the cover image on the project page; `image` is still used for cards
	- `palette`, `theme_default`: optional own colour palette for the project page (defined in `css/style.css`, e.g. `seldom-and-shade`) and `dark` to open the page in dark mode; visitors can still switch, and that choice is remembered for this page only
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
