// Remember the language a visitor picks with the EN / HU switch,
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
