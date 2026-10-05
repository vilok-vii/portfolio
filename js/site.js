// Scripts used on every page.

// Remember the language a visitor picks with the language switch,
// so the root address sends them to it next time (see /index.html).
document.querySelectorAll(".lang-switch").forEach((link) => {
	link.addEventListener("click", () => {
		try {
			localStorage.setItem("lang", link.dataset.lang);
		} catch (e) {
			// Storage blocked: the switch still works, it just isn't remembered
		}
	});
});

// Remember whether projects were opened from the home page or from All projects,
// so the back link on a project page can lead to the same place (see project.js).
(function () {
	const origin = document.querySelector("[data-back-origin]");
	if (!origin) return;
	try {
		sessionStorage.setItem("backOrigin", origin.dataset.backOrigin);
	} catch (e) {
		// Storage blocked: the back link keeps pointing to All projects
	}
})();

// Dark mode toggle. Light is the default; the choice is remembered.
// Pages with their own palette remember it under their own key (data-theme-key).
// (A small script in the page head applies a saved choice before the page draws.)
(function () {
	const root = document.documentElement;
	const key = root.dataset.themeKey || "theme";
	document.querySelectorAll(".theme-toggle").forEach((button) => {
		button.setAttribute("aria-pressed", String(root.dataset.theme === "dark"));
		button.addEventListener("click", () => {
			const dark = root.dataset.theme !== "dark";
			if (dark) {
				root.dataset.theme = "dark";
			} else {
				delete root.dataset.theme;
			}
			button.setAttribute("aria-pressed", String(dark));
			try {
				localStorage.setItem(key, dark ? "dark" : "light");
			} catch (e) {
				// Storage blocked: the toggle still works for this page
			}
		});
	});
})();

// Menu panel on narrow screens
(function () {
	const toggle = document.querySelector(".menu-toggle");
	const menu = document.getElementById("site-menu");
	const close = document.querySelector(".menu-close");
	const backdrop = document.querySelector(".menu-backdrop");
	if (!toggle || !menu) return;

	const narrow = window.matchMedia("(max-width: 720px)");

	function open() {
		menu.classList.add("is-open");
		toggle.setAttribute("aria-expanded", "true");
		backdrop.hidden = false;
		document.body.style.overflow = "hidden";
		close.focus();
	}

	function shut(returnFocus) {
		if (!menu.classList.contains("is-open")) return;
		menu.classList.remove("is-open");
		toggle.setAttribute("aria-expanded", "false");
		backdrop.hidden = true;
		document.body.style.overflow = "";
		if (returnFocus) toggle.focus();
	}

	toggle.addEventListener("click", open);
	close.addEventListener("click", () => shut(true));
	backdrop.addEventListener("click", () => shut(true));
	document.addEventListener("keydown", (e) => {
		if (e.key === "Escape") shut(true);
	});
	// Widening the window past the breakpoint closes the panel
	narrow.addEventListener("change", (e) => {
		if (!e.matches) shut(false);
	});
})();
