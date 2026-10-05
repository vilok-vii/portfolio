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

// Image albums: one image at a time, with arrows and thumbnails.
// Without this script the album is a row of images that scrolls sideways.
document.querySelectorAll(".album").forEach((album) => {
	const track = album.querySelector(".album__track");
	const items = [...album.querySelectorAll(".album__item")];
	const bar = album.querySelector(".album__bar");
	const thumbs = [...album.querySelectorAll(".album__thumb")];
	const [prev, next] = album.querySelectorAll(".album__nav");
	if (items.length < 2) return;
	bar.hidden = false;

	let current = 0;
	const go = (i) => {
		current = Math.max(0, Math.min(items.length - 1, i));
		track.scrollTo({ left: items[current].offsetLeft - track.offsetLeft, behavior: "smooth" });
	};
	const mark = () => {
		thumbs.forEach((t, i) => t.setAttribute("aria-current", String(i === current)));
		prev.disabled = current === 0;
		next.disabled = current === items.length - 1;
		// Keep the current thumbnail visible by scrolling only the thumbnail row
		// (scrollIntoView would also scroll the page to the album)
		const strip = thumbs[current].parentElement;
		const t = thumbs[current].getBoundingClientRect();
		const s = strip.getBoundingClientRect();
		if (t.left < s.left) strip.scrollLeft -= s.left - t.left;
		else if (t.right > s.right) strip.scrollLeft += t.right - s.right;
	};

	prev.addEventListener("click", () => go(current - 1));
	next.addEventListener("click", () => go(current + 1));
	thumbs.forEach((t, i) => t.addEventListener("click", () => go(i)));
	track.addEventListener("keydown", (e) => {
		if (e.key === "ArrowLeft") { e.preventDefault(); go(current - 1); }
		if (e.key === "ArrowRight") { e.preventDefault(); go(current + 1); }
	});
	// Swiping or scrolling the track also moves the selection
	track.addEventListener("scroll", () => {
		const i = Math.round(track.scrollLeft / track.clientWidth);
		if (i !== current) {
			current = i;
			mark();
		}
	}, { passive: true });
	mark();
});

// Image viewer: gallery and album images open over the page instead of on their own.
// Arrows (and the arrow keys) step through the images of the same gallery or album.
(function () {
	const dialog = document.querySelector(".lightbox");
	if (!dialog || typeof dialog.showModal !== "function") return;
	const img = dialog.querySelector(".lightbox__img");
	const caption = dialog.querySelector(".lightbox__caption");
	const close = dialog.querySelector(".lightbox__close");
	const navs = dialog.querySelectorAll(".lightbox__nav");
	let group = [];
	let index = 0;

	function show(i) {
		index = (i + group.length) % group.length;
		const link = group[index];
		const figure = link.closest("figure");
		dialog.classList.remove("lightbox--tall");
		img.src = link.href;
		img.alt = link.querySelector("img").alt;
		dialog.scrollTop = 0;
		caption.textContent = figure ? figure.querySelector("figcaption").textContent : "";
		caption.hidden = !caption.textContent;
	}

	// Much taller than the screen: show it at a readable width and let the viewer scroll
	img.addEventListener("load", () => {
		const shown = Math.min(img.naturalWidth, dialog.clientWidth - 2 * parseFloat(getComputedStyle(dialog).paddingLeft));
		const tall = (img.naturalHeight * shown) / img.naturalWidth > window.innerHeight * 1.2;
		dialog.classList.toggle("lightbox--tall", tall);
	});

	document.querySelectorAll(".gallery, .album__track").forEach((container) => {
		const links = [...container.querySelectorAll("a")].filter((a) => a.querySelector("img"));
		links.forEach((link, i) => {
			link.addEventListener("click", (e) => {
				e.preventDefault();
				group = links;
				navs.forEach((n) => (n.hidden = links.length < 2));
				show(i);
				dialog.showModal();
				document.documentElement.style.overflow = "hidden";
			});
		});
	});

	close.addEventListener("click", () => dialog.close());
	navs.forEach((n) => n.addEventListener("click", () => show(index + Number(n.dataset.step))));
	dialog.addEventListener("keydown", (e) => {
		if (group.length < 2) return;
		if (e.key === "ArrowLeft") show(index - 1);
		if (e.key === "ArrowRight") show(index + 1);
	});
	// A click anywhere outside the image (and the buttons) closes it
	dialog.addEventListener("click", (e) => {
		if (e.target === dialog || e.target.classList.contains("lightbox__figure")) dialog.close();
	});
	// Esc closes the dialog by itself; this runs for every way of closing
	dialog.addEventListener("close", () => {
		document.documentElement.style.overflow = "";
	});
})();
