// Renders the featured projects from projects-data.js on the Portfolio page.
(function () {
	const list = document.getElementById("showcase");
	if (!list || !window.PROJECTS) return;

	const root = list.dataset.root || "";
	const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

	list.innerHTML = window.PROJECTS
		.filter((p) => p.featured)
		.map((p) => `
			<article class="showcase__item">
				<a class="showcase__media" href="${root}projects/${p.slug}/" tabindex="-1" aria-hidden="true">
					${p.image
						? `<img class="ph" src="${root}${esc(p.image)}" alt="">`
						: `<div class="ph">Project image</div>`}
				</a>
				<div class="showcase__body">
					<span class="label">${esc(p.category)} · ${p.year}</span>
					<h2>${esc(p.title)}</h2>
					<p class="muted">${esc(p.summary)}</p>
					<ul class="tags">${p.tools.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
					<div><a class="btn" href="${root}projects/${p.slug}/">View project</a></div>
				</div>
			</article>`)
		.join("");
})();
