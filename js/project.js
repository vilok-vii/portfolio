// Scripts for individual project pages.

// Back link: lead to where the visitor opened the project from.
// The home page and All projects record themselves in site.js; All projects is the default.
(function () {
	const link = document.querySelector(".back");
	if (!link) return;
	let origin = null;
	try {
		origin = sessionStorage.getItem("backOrigin");
	} catch (e) {}
	if (origin === "home") {
		link.href = link.dataset.homeHref;
		link.querySelector("span").textContent = link.dataset.homeLabel;
	}
	// Coming straight from that page: go back in history instead, so the
	// visitor returns to the same scroll position (and filters on All projects).
	link.addEventListener("click", (e) => {
		const target = new URL(link.href, location.href);
		let from = null;
		try {
			from = new URL(document.referrer);
		} catch (err) {
			return;
		}
		if (from.origin === target.origin && from.pathname === target.pathname && history.length > 1) {
			e.preventDefault();
			history.back();
		}
	});
})();

// Image viewer: gallery images open over the page instead of on their own.
(function () {
	const dialog = document.querySelector(".lightbox");
	if (!dialog || typeof dialog.showModal !== "function") return;
	const img = dialog.querySelector(".lightbox__img");
	const close = dialog.querySelector(".lightbox__close");

	document.querySelectorAll(".gallery a").forEach((link) => {
		const thumb = link.querySelector("img");
		if (!thumb) return;
		link.addEventListener("click", (e) => {
			e.preventDefault();
			img.src = link.href;
			img.alt = thumb.alt;
			dialog.showModal();
			document.documentElement.style.overflow = "hidden";
		});
	});

	close.addEventListener("click", () => dialog.close());
	// A click anywhere outside the image closes it
	dialog.addEventListener("click", (e) => {
		if (e.target !== img) dialog.close();
	});
	// Esc closes the dialog by itself; this runs for every way of closing
	dialog.addEventListener("close", () => {
		document.documentElement.style.overflow = "";
	});
})();
