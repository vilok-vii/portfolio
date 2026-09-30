// Nav border on scroll
const nav = document.querySelector(".nav");
if (nav) {
	const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 8);
	onScroll();
	window.addEventListener("scroll", onScroll, { passive: true });
}

// Mobile menu
const toggle = document.querySelector(".nav__toggle");
const links = document.querySelector(".nav__links");
if (toggle && links) {
	toggle.addEventListener("click", () => {
		const open = links.classList.toggle("is-open");
		toggle.setAttribute("aria-expanded", String(open));
		toggle.textContent = open ? "Close" : "Menu";
	});
	links.querySelectorAll("a").forEach((a) =>
		a.addEventListener("click", () => {
			links.classList.remove("is-open");
			toggle.setAttribute("aria-expanded", "false");
			toggle.textContent = "Menu";
		})
	);
}

// Reveal elements as they scroll into view
const revealEls = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
	const io = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					io.unobserve(entry.target);
				}
			});
		},
		{ threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
	);
	revealEls.forEach((el) => io.observe(el));
} else {
	revealEls.forEach((el) => el.classList.add("is-visible"));
}

// Current year in footer
document.querySelectorAll("[data-year]").forEach((el) => {
	el.textContent = new Date().getFullYear();
});
