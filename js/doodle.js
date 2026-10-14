// Doodling: with a mouse, press and drag on empty background to draw.
// Strokes fade away after a moment. Pressing on content (text, images,
// links, buttons, the header) works as usual and never starts a stroke.
// To remove the feature: delete this file, its script tag in
// _layouts/default.html and the "Doodling" block in css/style.css.
(function () {
	// Mouse only: on touch screens dragging scrolls the page
	if (!window.matchMedia("(pointer: fine)").matches) return;

	const LIFE = 1400; // ms a stroke stays visible
	const WIDTH = 5;
	const CONTENT = "a, button, input, select, textarea, label, summary, dialog, img, video, iframe, svg, " +
		"h1, h2, h3, h4, h5, h6, p, li, dt, dd, span, figure, figcaption, .ph, .tags, .site-header, .tip";

	const root = document.documentElement;
	const canvas = document.createElement("canvas");
	canvas.className = "doodle";
	canvas.setAttribute("aria-hidden", "true");
	document.body.appendChild(canvas);
	const ctx = canvas.getContext("2d");

	let segments = [];
	let last = null;
	let color = "";
	let colorIndex = 0;
	let frame = 0;

	function resize() {
		const dpr = window.devicePixelRatio || 1;
		canvas.width = Math.round(innerWidth * dpr);
		canvas.height = Math.round(innerHeight * dpr);
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		draw();
	}

	function isBlank(target) {
		return target instanceof Element && !target.closest(CONTENT);
	}

	// Each stroke takes the next colour from the palette
	function nextColor() {
		const names = ["--red", "--orange", "--teal"];
		const value = getComputedStyle(root).getPropertyValue(names[colorIndex % names.length]).trim();
		colorIndex++;
		return value || "#df301c";
	}

	function draw() {
		const now = performance.now();
		segments = segments.filter((s) => now - s.t < LIFE);
		ctx.clearRect(0, 0, innerWidth, innerHeight);
		ctx.lineCap = "round";
		for (const s of segments) {
			const left = 1 - (now - s.t) / LIFE;
			ctx.globalAlpha = left;
			ctx.lineWidth = WIDTH * (0.4 + 0.6 * left);
			ctx.strokeStyle = s.color;
			ctx.beginPath();
			ctx.moveTo(s.x0, s.y0);
			ctx.lineTo(s.x1, s.y1);
			ctx.stroke();
		}
		ctx.globalAlpha = 1;
		frame = segments.length ? requestAnimationFrame(draw) : 0;
	}

	function start() {
		if (!frame) frame = requestAnimationFrame(draw);
	}

	document.addEventListener("pointerdown", (e) => {
		if (e.pointerType !== "mouse" || e.button !== 0 || !isBlank(e.target)) return;
		e.preventDefault(); // no text selection while drawing
		last = { x: e.clientX, y: e.clientY };
		color = nextColor();
		root.classList.add("is-doodling");
	});

	document.addEventListener("pointermove", (e) => {
		if (last) {
			segments.push({ x0: last.x, y0: last.y, x1: e.clientX, y1: e.clientY, t: performance.now(), color });
			last = { x: e.clientX, y: e.clientY };
			start();
		} else if (e.pointerType === "mouse") {
			// Pencil cursor over empty background, as a hint
			root.classList.toggle("can-doodle", isBlank(e.target));
		}
	});

	function stop() {
		last = null;
		root.classList.remove("is-doodling");
	}
	document.addEventListener("pointerup", stop);
	window.addEventListener("blur", stop);
	window.addEventListener("resize", resize);
	resize();
})();
