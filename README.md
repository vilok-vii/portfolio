# Vilmos Horváth — Portfolio

Portfolio built with [Jekyll](https://jekyllrb.com/), which GitHub Pages builds automatically on every push. Currently placeholders only.

## URLs

| Address | Page |
| --- | --- |
| `/` | Home: intro (who I am, what I do), selected work |
| `/portfolio/` | Old address; redirects to the selected work on the home page |
| `/projects/` | List of all projects, newest first |
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
js/site.js            Mobile menu, dark mode toggle, tooltips
js/doodle.js          Drawing with the right mouse button
js/palette-tool.js    Live colour tool, only after ?palette
404.html              Not-found page; forwards old /en/ and /hu/ links
```

## Colours and grain

At the top of `css/style.css`:

- `--blue`, `--yellow`, `--red`: the three colours the site revolves around. Blue is the accent (buttons, borders, focus rings; text accents use a deeper blue, `--accent-strong`, since plain blue is too faint as text), yellow is the header, red (`--deco`) is for decorations like bullets, placeholders and drawings.
- `--cream`, `--ink`: neutral page background and text colour.
- All other colours (backgrounds, lines, tints, buttons) are derived from these, so changing them restyles the whole site.
- `--header-bg`, `--header-text`, `--header-accent`: colour of the header bar, its text and the current-page underline (yellow with dark text and a red underline; a dark muted yellow in dark mode).
- `--grain-opacity`: strength of the film-grain texture (`assets/images/noise.png`) laid over the page. `0` turns it off.
- Dark-mode colours are in the `:root[data-theme="dark"]` block just below. The site starts in light mode; visitors switch with the moon/sun button in the header, and their choice is remembered.

## Trying out colours (palette tool)

Open any page with `?palette` at the end of the address (for example `https://vilok-vii.github.io/portfolio/?palette`). A round palette button appears in the bottom right corner; it opens a panel with a colour picker and a hex field for each palette colour, plus the header, accent and decoration colours. Changes show live and are kept in your browser while you move between pages. Visitors never see the tool.

- **Copy** puts the changed colours on the clipboard as CSS lines, ready to paste over the values at the top of `css/style.css` (or send them to whoever edits the site).
- **Reset** goes back to the site's real colours.
- **Turn off** resets and hides the tool again (so does `?palette=off`).

The tool lives in `js/palette-tool.js` and the "Palette tool" block at the end of `css/style.css`.

## Changing text

- Navigation, buttons, headings and other interface text: edit `_data/text.yml`.
- A project's text: edit its file in `_projects/`.

## Tooltips

Hovering (or tabbing to) a word can show a small custom window. The name in the home intro uses it; its text is `name_tip` in `_data/text.yml`. To add one elsewhere:

```
<span class="tip" tabindex="0" aria-describedby="my-tip">word<span class="tip__box" role="tooltip" id="my-tip">Tooltip text</span></span>
```

Give each tooltip its own `id`. It opens above its word, or below when the header would cover it. A line break in the text (`\n` in `_data/text.yml`) starts a new line in the tooltip. Escape closes an open tooltip.

## Doodling

With a mouse, visitors can hold the right button and drag anywhere to draw (`js/doodle.js`). Drawings scroll with the page and pass under the header. They stay until the page is reloaded or left, or until the eraser button that appears in the bottom left corner clears them. A right-click without dragging still opens the browser menu where the browser allows it (Windows); Shift + right-click always does. Touch screens are left out. To remove it: delete `js/doodle.js`, its `<script>` line in `_layouts/default.html` and the "Doodling" block at the end of `css/style.css`.

## Adding a project

1. Copy a file in `_projects/` and give it a new name, e.g. `my-game.md`. The file name becomes the URL: `/projects/my-game/`.
2. Fill in the front matter (between the `---` lines):
	- `title`, `summary`, `role`: text shown on cards and the project page
	- `order`: position in lists and previous/next links (1 = first)
	- `category`: `tech-design`, `game-design`, `ui-ux` or `creative` (labels come from `_data/text.yml`; add new ones there)
	- `year`, `tools`, `featured` (`true` = also shown under Portfolio on the home page)
	- `responsibilities`, `skills`: optional lists (Key responsibilities, Relevant skills) shown below the facts row on the project page and on the Portfolio cards on the home page
	- Image album: list images in the front matter (e.g. `design_docs:` with `- src:` and `caption:` per image) and put `{% include album.html items=page.design_docs %}` where it should appear in the text
	- `image`: optional cover/thumbnail path, e.g. `/assets/images/my-game/cover.jpg`
	- `thumbnail`: optional image for the project cards on the home and projects pages; falls back to `image` when left out
	- `video`: optional YouTube video ID (the part after `youtu.be/`), shown instead of the cover image on the project page; `image` is still used for cards
	- `play_url`: optional link to a playable build (e.g. itch.io); shows a Play button next to the title
3. Write the project text below the front matter in Markdown.

The Projects page lists projects newest year first, then by `order`.

## Preview locally (optional)

Pushing to GitHub is enough; the live site updates about a minute later. To preview on your own computer first, install Ruby, then:

```
bundle install
bundle exec jekyll serve
```

and open http://localhost:4000/portfolio/.
