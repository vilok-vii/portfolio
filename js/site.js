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
