# Vilmos Horváth — Portfolio

Portfolio built with [Jekyll](https://jekyllrb.com/), which GitHub Pages builds automatically on every push. Currently placeholders only.

## URLs

| Address | Page |
| --- | --- |
| `/` | Home: intro (who I am, what I do), selected work, link to all projects |
| `/portfolio/` | Old address; redirects to the selected work on the home page |
| `/projects/` | Searchable, filterable list of all projects |
| `/projects/<slug>/` | Individual project page |
| `/about/` | About |

Old links that start with `/en/` or `/hu/` are forwarded to the same page without the prefix (see `404.html`).

## Where things live

```
_config.yml           Site settings (base URL, project URLs)
_data/text.yml        All interface text (nav, buttons, labels, …)
_layouts/             Page templates
	default.html      Header (navigation), footer
	home.html, projects.html, about.html, project.html
_projects/            One Markdown file per project
index.html            Home page (picks the home layout)
about/, projects/     Tiny files that pick a layout for each page
css/style.css         All styles; palette and grain at the top
assets/images/        Images (noise.png = grain texture)
js/projects.js        Search, filters and sorting on the Projects page
js/site.js            Mobile menu, dark mode toggle
404.html              Not-found page; forwards old /en/ and /hu/ links
```

## Colours and grain

At the top of `css/style.css`:

- `--red`, `--orange`, `--cream`, `--teal`, `--ink`: the palette. All other colours (backgrounds, lines, tints, buttons) are derived from these, so changing them restyles the whole site.
- `--grain-opacity`: strength of the film-grain texture (`assets/images/noise.png`) laid over the page. `0` turns it off.
- Dark-mode colours are in the `:root[data-theme="dark"]` block just below. The site starts in light mode; visitors switch with the moon/sun button in the header, and their choice is remembered.

## Changing text

- Navigation, buttons, headings and other interface text: edit `_data/text.yml`.
- A project's text: edit its file in `_projects/`.

## Adding a project

1. Copy a file in `_projects/` and give it a new name, e.g. `my-game.md`. The file name becomes the URL: `/projects/my-game/`.
2. Fill in the front matter (between the `---` lines):
	- `title`, `summary`, `role`: text shown on cards and the project page
	- `order`: position in lists and previous/next links (1 = first)
	- `category`: `tech-design`, `game-design`, `ui-ux` or `creative` (labels come from `_data/text.yml`; add new ones there)
	- `year`, `tools`, `featured` (`true` = also shown under Selected work on the home page)
	- `responsibilities`, `skills`: optional lists (Key responsibilities, Relevant skills) shown below the facts row on the project page and on the Selected work cards on the home page
	- Image album: list images in the front matter (e.g. `design_docs:` with `- src:` and `caption:` per image) and put `{% include album.html items=page.design_docs %}` where it should appear in the text
	- `image`: optional cover/thumbnail path, e.g. `/assets/images/my-game/cover.jpg`
	- `thumbnail`: optional image for the project cards on the home and projects pages; falls back to `image` when left out
	- `video`: optional YouTube video ID (the part after `youtu.be/`), shown instead of the cover image on the project page; `image` is still used for cards
	- `play_url`: optional link to a playable build (e.g. itch.io); shows a Play button next to the title
3. Write the project text below the front matter in Markdown.

Filter options on the Projects page are built from the projects automatically.

## Preview locally (optional)

Pushing to GitHub is enough; the live site updates about a minute later. To preview on your own computer first, install Ruby, then:

```
bundle install
bundle exec jekyll serve
```

and open http://localhost:4000/portfolio/.
