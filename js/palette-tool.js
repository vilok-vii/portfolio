// Palette tool: a design aid for trying out theme colours live.
// Hidden from visitors. Turn it on by opening any page with ?palette at the
// end of the address (e.g. /portfolio/?palette); it then stays on in this
// browser until "Turn off" in the panel (or ?palette=off).
// Chosen colours are kept in this browser while browsing; "Copy" puts them on
// the clipboard as CSS lines to paste into the top of css/style.css.
// To remove the tool: delete this file, its script tag in
// _layouts/default.html and the "Palette tool" block in css/style.css.
(function () {
	const ON_KEY = "paletteTool";
	const COLORS_KEY = "paletteToolColors";

	const store = {
		get(key) {
			try {
				return localStorage.getItem(key);
			} catch (e) {
				return null;
			}
		},
		set(key, value) {
			try {
				if (value === null) localStorage.removeItem(key);
				else localStorage.setItem(key, value);
			} catch (e) {
				// Storage blocked: the tool still works on this page
			}
		}
	};

	// ?palette turns the tool on, ?palette=off turns it off
	const param = new URLSearchParams(location.search).get("palette");
	if (param !== null) store.set(ON_KEY, param === "off" ? null : "on");
	if (param === "off" || (param === null && store.get(ON_KEY) !== "on")) return;

	const root = document.documentElement;

	// The colours that can be changed: the palette first, then a few roles
	// that normally follow the palette but can be set on their own
	const FIELDS = [
		{ name: "--blue", label: "Blue" },
		{ name: "--yellow", label: "Yellow" },
		{ name: "--red", label: "Red" },
		{ name: "--cream", label: "Cream (page)" },
		{ name: "--ink", label: "Ink (text)" },
		{ name: "--header-bg", label: "Header", role: true },
		{ name: "--header-text", label: "Header text", role: true },
		{ name: "--accent", label: "Accent (links, buttons)", role: true },
		{ name: "--deco", label: "Decorations", role: true }
	];

	let saved = {};
	try {
		saved = JSON.parse(store.get(COLORS_KEY) || "{}") || {};
	} catch (e) {
		saved = {};
	}

	function apply() {
		FIELDS.forEach((f) => {
			if (saved[f.name]) root.style.setProperty(f.name, saved[f.name]);
			else root.style.removeProperty(f.name);
		});
		store.set(COLORS_KEY, Object.keys(saved).length ? JSON.stringify(saved) : null);
	}
	apply();

	// Turns any CSS colour (including var() and color-mix()) into #rrggbb
	const probe = document.createElement("span");
	probe.style.display = "none";
	document.body.appendChild(probe);
	function currentHex(name) {
		probe.style.color = "";
		probe.style.color = "var(" + name + ")";
		const value = getComputedStyle(probe).color;
		// Browsers report "rgb(r, g, b)", or "color(srgb r g b)" for mixed colours
		let channels = null;
		const rgb = value.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/);
		const srgb = value.match(/^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/);
		if (rgb) channels = rgb.slice(1, 4).map(Number);
		else if (srgb) channels = srgb.slice(1, 4).map((v) => Number(v) * 255);
		if (!channels) return "#000000";
		return "#" + channels.map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0")).join("");
	}

	function normalizeHex(text) {
		let v = text.trim().replace(/^#/, "").toLowerCase();
		if (/^[0-9a-f]{3}$/.test(v)) v = v.split("").map((c) => c + c).join("");
		return /^[0-9a-f]{6}$/.test(v) ? "#" + v : null;
	}

	// Panel
	const wrap = document.createElement("div");
	wrap.className = "palette-tool";
	wrap.innerHTML =
		'<button type="button" class="palette-tool__toggle" aria-expanded="false" aria-controls="palette-tool-panel" title="Theme colours" aria-label="Theme colours">' +
		'<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 0 0 0 18c1.1 0 1.8-.8 1.8-1.7 0-.5-.2-.9-.5-1.2-.3-.3-.5-.7-.5-1.2 0-1 .8-1.7 1.7-1.7H16a5 5 0 0 0 5-5c0-4-4-7.2-9-7.2z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="7.5" cy="11.5" r="1.5" fill="currentColor"/><circle cx="10.5" cy="7.5" r="1.5" fill="currentColor"/><circle cx="15.5" cy="8" r="1.5" fill="currentColor"/></svg>' +
		"</button>" +
		'<div class="palette-tool__panel" id="palette-tool-panel" role="dialog" aria-label="Theme colours" hidden>' +
		'<p class="palette-tool__title">Theme colours</p>' +
		'<div class="palette-tool__rows"></div>' +
		'<p class="palette-tool__note">Header, accent and decorations follow the palette until you change them. Changes apply to light and dark mode.</p>' +
		'<div class="palette-tool__actions">' +
		'<button type="button" data-action="copy">Copy</button>' +
		'<button type="button" data-action="reset">Reset</button>' +
		'<button type="button" data-action="off">Turn off</button>' +
		"</div>" +
		"</div>";
	document.body.appendChild(wrap);

	const toggle = wrap.querySelector(".palette-tool__toggle");
	const panel = wrap.querySelector(".palette-tool__panel");
	const rows = wrap.querySelector(".palette-tool__rows");

	const inputs = FIELDS.map((f, i) => {
		const row = document.createElement("div");
		row.className = "palette-tool__row" + (f.role && !FIELDS[i - 1].role ? " palette-tool__row--first-role" : "");
		const id = "palette-tool-" + f.name.slice(2);
		row.innerHTML =
			'<label for="' + id + '">' + f.label + "</label>" +
			'<input type="color" id="' + id + '" aria-label="' + f.label + ' colour picker">' +
			'<input type="text" class="palette-tool__hex" maxlength="7" spellcheck="false" autocomplete="off" aria-label="' + f.label + ' hex code">';
		rows.appendChild(row);
		const picker = row.querySelector('input[type="color"]');
		const hex = row.querySelector(".palette-tool__hex");

		function set(value) {
			saved[f.name] = value;
			apply();
			refresh();
		}
		picker.addEventListener("input", () => set(picker.value));
		hex.addEventListener("input", () => {
			const value = normalizeHex(hex.value);
			hex.classList.toggle("is-invalid", !value);
			if (value) {
				saved[f.name] = value;
				apply();
				refresh(hex);
			}
		});
		hex.addEventListener("blur", () => {
			hex.classList.remove("is-invalid");
			refresh();
		});
		return { field: f, picker, hex, row };
	});

	// Shows the current colours, leaving alone the hex field being typed in
	function refresh(typing) {
		inputs.forEach(({ field, picker, hex, row }) => {
			const value = currentHex(field.name);
			picker.value = value;
			if (hex !== typing) hex.value = value;
			row.classList.toggle("is-changed", Boolean(saved[field.name]));
		});
	}

	function open(show) {
		panel.hidden = !show;
		toggle.setAttribute("aria-expanded", String(show));
		if (show) refresh();
	}
	toggle.addEventListener("click", () => open(panel.hidden));
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape" && !panel.hidden) {
			open(false);
			toggle.focus();
		}
	});

	// The dark mode toggle changes the role colours: keep the panel in step
	new MutationObserver(() => {
		if (!panel.hidden) refresh();
	}).observe(root, { attributes: true, attributeFilter: ["data-theme"] });

	wrap.querySelector(".palette-tool__actions").addEventListener("click", (e) => {
		const button = e.target.closest("button");
		if (!button) return;
		const action = button.dataset.action;
		if (action === "copy") {
			const lines = FIELDS.filter((f) => saved[f.name]).map((f) => "\t" + f.name + ": " + saved[f.name] + ";");
			const text = lines.length ? lines.join("\n") : "/* No colours changed */";
			const done = () => {
				button.textContent = "Copied!";
				setTimeout(() => (button.textContent = "Copy"), 1500);
			};
			if (navigator.clipboard && navigator.clipboard.writeText) {
				navigator.clipboard.writeText(text).then(done, () => window.prompt("Copy these lines:", text));
			} else {
				window.prompt("Copy these lines:", text);
			}
		} else if (action === "reset") {
			saved = {};
			apply();
			refresh();
		} else if (action === "off") {
			saved = {};
			apply();
			store.set(ON_KEY, null);
			wrap.remove();
		}
	});
})();
