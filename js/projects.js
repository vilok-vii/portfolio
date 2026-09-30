// Search, filter and sort for the Projects page. Reads projects-data.js.
(function () {
	const grid = document.getElementById("project-grid");
	if (!grid || !window.PROJECTS) return;

	const root = grid.dataset.root || "";
	const projects = window.PROJECTS;
	const els = {
		search: document.getElementById("search"),
		year: document.getElementById("filter-year"),
		tool: document.getElementById("filter-tool"),
		sort: document.getElementById("sort"),
		chips: document.getElementById("category-chips"),
		count: document.getElementById("result-count"),
		clear: document.getElementById("clear-filters"),
		empty: document.getElementById("empty")
	};
	const state = { q: "", category: "All", year: "", tool: "", sort: "newest" };
	const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
	const unique = (arr) => [...new Set(arr)];

	// Build filter options from the data
	const categories = ["All", ...unique(projects.map((p) => p.category)).sort()];
	els.chips.innerHTML = categories
		.map((c) => `<button type="button" class="chip" data-category="${esc(c)}" aria-pressed="${c === "All"}">${esc(c)}</button>`)
		.join("");
	unique(projects.map((p) => p.year)).sort((a, b) => b - a)
		.forEach((y) => els.year.add(new Option(y, y)));
	unique(projects.flatMap((p) => p.tools)).sort()
		.forEach((t) => els.tool.add(new Option(t, t)));

	function matches(p) {
		if (state.category !== "All" && p.category !== state.category) return false;
		if (state.year && String(p.year) !== state.year) return false;
		if (state.tool && !p.tools.includes(state.tool)) return false;
		if (state.q) {
			const hay = [p.title, p.summary, p.category, p.role, p.year, ...p.tools].join(" ").toLowerCase();
			if (!state.q.split(/\s+/).every((word) => hay.includes(word))) return false;
		}
		return true;
	}

	const sorters = {
		newest: (a, b) => b.year - a.year || a.title.localeCompare(b.title),
		oldest: (a, b) => a.year - b.year || a.title.localeCompare(b.title),
		az: (a, b) => a.title.localeCompare(b.title)
	};

	function render() {
		const list = projects.filter(matches).sort(sorters[state.sort]);
		grid.innerHTML = list
			.map((p) => `
				<a class="card" href="${root}projects/${p.slug}/">
					${p.image
						? `<img class="ph" src="${root}${esc(p.image)}" alt="">`
						: `<div class="ph">Thumbnail</div>`}
					<span class="card__title">${esc(p.title)}</span>
					<span class="card__meta">${esc(p.category)} · ${p.year}</span>
					<ul class="tags">${p.tools.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
				</a>`)
			.join("");
		els.empty.hidden = list.length > 0;
		els.count.textContent = `${list.length} of ${projects.length} projects`;
		const filtered = state.q || state.category !== "All" || state.year || state.tool;
		els.clear.hidden = !filtered;
	}

	els.search.addEventListener("input", () => {
		state.q = els.search.value.trim().toLowerCase();
		render();
	});
	els.year.addEventListener("change", () => {
		state.year = els.year.value;
		render();
	});
	els.tool.addEventListener("change", () => {
		state.tool = els.tool.value;
		render();
	});
	els.sort.addEventListener("change", () => {
		state.sort = els.sort.value;
		render();
	});
	els.chips.addEventListener("click", (e) => {
		const chip = e.target.closest(".chip");
		if (!chip) return;
		state.category = chip.dataset.category;
		els.chips.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c === chip)));
		render();
	});
	els.clear.addEventListener("click", () => {
		Object.assign(state, { q: "", category: "All", year: "", tool: "" });
		els.search.value = "";
		els.year.value = "";
		els.tool.value = "";
		els.chips.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", String(c.dataset.category === "All")));
		render();
	});

	render();
})();
