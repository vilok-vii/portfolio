// Doodling: hold the right mouse button and drag anywhere on the page to draw.
// Drawings stay (and scroll with the page) until it is reloaded or left.
// The browser's right-click menu: a right-click without dragging still opens
// it where the browser allows (Windows); Shift + right-click always does.
// To remove the feature: delete this file, its script tag in
// _layouts/default.html and the "Doodling" block in css/style.css.
(function () {
	// Mouse only: touch screens have no right button
	if (!window.matchMedia("(pointer: fine)").matches) return;

	const WIDTH = 4;
	const MOVE_THRESHOLD = 4; // px before a right-press counts as drawing

	const root = document.documentElement;
	const canvas = document.createElement("canvas");
	canvas.className = "doodle";
	canvas.setAttribute("aria-hidden", "true");
	document.body.appendChild(canvas);
	const ctx = canvas.getContext("2d");

	// Strokes are kept in page coordinates, so they scroll with the content
	const strokes = [];
	let stroke = null; // the stroke being drawn
	let start = null; // where the right button went down
	let moved = false; // whether the current right-press has drawn anything
	let colorIndex = 0;
	let frame = 0;

	// Each stroke takes the next colour from the palette
	function nextColor() {
		const names = ["--red", "--orange", "--teal"];
		const value = getComputedStyle(root).getPropertyValue(names[colorIndex % names.length]).trim();
		colorIndex++;
		return value || "#df301c";
	}

	function draw() {
		frame = 0;
		ctx.clearRect(0, 0, innerWidth, innerHeight);
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		ctx.lineWidth = WIDTH;
		for (const s of strokes) {
			const pts = s.points;
			ctx.strokeStyle = s.color;
			ctx.beginPath();
			ctx.moveTo(pts[0].x - scrollX, pts[0].y - scrollY);
			// Smooth the line through the midpoints between samples
			for (let i = 1; i < pts.length - 1; i++) {
				const mx = (pts[i].x + pts[i + 1].x) / 2 - scrollX;
				const my = (pts[i].y + pts[i + 1].y) / 2 - scrollY;
				ctx.quadraticCurveTo(pts[i].x - scrollX, pts[i].y - scrollY, mx, my);
			}
			const end = pts[pts.length - 1];
			ctx.lineTo(end.x - scrollX, end.y - scrollY);
			ctx.stroke();
		}
	}

	function redraw() {
		if (!frame) frame = requestAnimationFrame(draw);
	}

	function resize() {
		const dpr = window.devicePixelRatio || 1;
		canvas.width = Math.round(innerWidth * dpr);
		canvas.height = Math.round(innerHeight * dpr);
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		redraw();
	}

	document.addEventListener("pointerdown", (e) => {
		if (e.pointerType !== "mouse") return;
		if (e.button !== 2 || e.shiftKey) {
			moved = false;
			return;
		}
		e.preventDefault();
		start = { x: e.clientX, y: e.clientY };
		moved = false;
		stroke = null;
	});

	document.addEventListener("pointermove", (e) => {
		if (!start || !(e.buttons & 2)) return;
		const point = { x: e.clientX + scrollX, y: e.clientY + scrollY };
		if (!stroke) {
			if (Math.hypot(e.clientX - start.x, e.clientY - start.y) < MOVE_THRESHOLD) return;
			moved = true;
			stroke = { color: nextColor(), points: [{ x: start.x + scrollX, y: start.y + scrollY }] };
			strokes.push(stroke);
			root.classList.add("is-doodling");
		}
		stroke.points.push(point);
		redraw();
	});

	function stop() {
		start = null;
		stroke = null;
		root.classList.remove("is-doodling");
	}
	document.addEventListener("pointerup", stop);
	window.addEventListener("blur", stop);

	// Keep the menu out of the way while drawing. On Windows it opens when the
	// button is released, so a click without dragging still gets it; elsewhere
	// it opens on press, so it is held back unless Shift is down.
	document.addEventListener("contextmenu", (e) => {
		if (e.shiftKey) return;
		if (start || moved) e.preventDefault();
	});

	window.addEventListener("scroll", redraw, { passive: true });
	window.addEventListener("resize", resize);
	resize();
})();
