// Search, filter and sort for the Projects page.
// The cards are rendered by Jekyll; this script only shows, hides and reorders them.
(function () {
	const grid = document.getElementById("project-grid");
	if (!grid) return;

	const lang = document.documentElement.lang;
	const cards = [...grid.querySelectorAll(".card")].map((el, i) => ({
		el,
		order: i,
		title: el.dataset.title,
		category: el.dataset.category,
		year: Number(el.dataset.year),
		tools: el.dataset.tools ? el.dataset.tools.split("|") : [],
		search: el.dataset.search
	}));
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
	const state = { q: "", category: "", year: "", tool: "", sort: "newest" };
	const unique = (arr) => [...new Set(arr)];

	// Fill the year and tool dropdowns from the cards
	unique(cards.map((c) => c.year)).sort((a, b) => b - a)
		.forEach((y) => els.year.add(new Option(y, y)));
	unique(cards.flatMap((c) => c.tools)).sort((a, b) => a.localeCompare(b, lang))
		.forEach((t) => els.tool.add(new Option(t, t)));

	function matches(c) {
		if (state.category && c.category !== state.category) return false;
		if (state.year && String(c.year) !== state.year) return false;
		if (state.tool && !c.tools.includes(state.tool)) return false;
		if (state.q && !state.q.split(/\s+/).every((word) => c.search.includes(word))) return false;
		return true;
	}

	const sorters = {
		newest: (a, b) => b.year - a.year || a.order - b.order,
		oldest: (a, b) => a.year - b.year || a.order - b.order,
		az: (a, b) => a.title.localeCompare(b.title, lang)
	};

	function render() {
		const sorted = [...cards].sort(sorters[state.sort]);
		let shown = 0;
		sorted.forEach((c) => {
			const visible = matches(c);
			c.el.hidden = !visible;
			if (visible) shown++;
			grid.appendChild(c.el);
		});
		els.empty.hidden = shown > 0;
		els.count.textContent = els.count.dataset.template
			.replace("{shown}", shown)
			.replace("{total}", cards.length);
		els.clear.hidden = !(state.q || state.category || state.year || state.tool);
	}

	function setCategory(value) {
		state.category = value;
		els.chips.querySelectorAll(".chip").forEach((chip) => {
			chip.setAttribute("aria-pressed", String(chip.dataset.category === value));
		});
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
		setCategory(chip.dataset.category);
		render();
	});
	els.clear.addEventListener("click", () => {
		Object.assign(state, { q: "", year: "", tool: "" });
		els.search.value = "";
		els.year.value = "";
		els.tool.value = "";
		setCategory("");
		render();
	});

	render();
})();
