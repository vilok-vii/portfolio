// Doodling: hold the right mouse button and drag anywhere on the page to draw.
// Drawings stay (and scroll with the page) until it is reloaded or left,
// or until the eraser button in the bottom left corner clears them.
// The browser's right-click menu: a right-click without dragging still opens
// it where the browser allows (Windows); Shift + right-click always does.
// To remove the feature: delete this file, its script tag in
// _layouts/default.html and the "Doodling" block in css/style.css.
(function () {
	// Mouse only: touch screens have no right button
	if (!window.matchMedia("(pointer: fine)").matches) return;

	const WIDTH = 4;
	const MOVE_THRESHOLD = 4; // px before a right-press counts as drawing
	const MENU_GRACE = 700; // ms after a line during which the menu stays blocked

	const root = document.documentElement;
	const canvas = document.createElement("canvas");
	canvas.className = "doodle";
	canvas.setAttribute("aria-hidden", "true");
	document.body.appendChild(canvas);
	const ctx = canvas.getContext("2d");

	// Eraser button in the bottom left corner; shows up once something is drawn
	const eraser = document.createElement("button");
	eraser.type = "button";
	eraser.className = "doodle-eraser";
	eraser.title = "Erase drawings";
	eraser.setAttribute("aria-label", "Erase drawings");
	eraser.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.5 20.5H20M3.8 14.6l9.8-9.8a2 2 0 0 1 2.8 0l3.3 3.3a2 2 0 0 1 0 2.8l-7.6 7.6a3 3 0 0 1-2.1.9H8.4a3 3 0 0 1-2.1-.9l-2.5-2.5a1 1 0 0 1 0-1.4zM9 9.4l5.6 5.6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
	document.body.appendChild(eraser);

	// Strokes are kept in page coordinates, so they scroll with the content
	const strokes = [];
	let stroke = null; // the stroke being drawn
	let start = null; // where the right button went down
	let moved = false; // whether the current right-press has drawn anything
	let lastLineEnd = -Infinity; // when the last line was finished
	let colorIndex = 0;
	let frame = 0;

	// Each stroke takes the next colour from the palette (accent follows the theme)
	function nextColor() {
		const names = ["--orange", "--green", "--accent"];
		const value = getComputedStyle(root).getPropertyValue(names[colorIndex % names.length]).trim();
		colorIndex++;
		return value || "#d98327";
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
		// Keep receiving the release even if it happens outside the window
		try {
			root.setPointerCapture(e.pointerId);
		} catch (err) {
			// Not supported: the release is still caught inside the window
		}
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
			eraser.classList.add("is-visible");
		}
		stroke.points.push(point);
		redraw();
	});

	function stop() {
		if (stroke) lastLineEnd = performance.now();
		start = null;
		stroke = null;
		root.classList.remove("is-doodling");
	}
	document.addEventListener("pointerup", stop);
	document.addEventListener("pointercancel", stop);
	window.addEventListener("blur", stop);

	// Keep the menu out of the way while drawing. On Windows it opens when the
	// button is released, so a click without dragging still gets it; elsewhere
	// it opens on press, so it is held back unless Shift is down. Shortly after
	// a line it is always held back, since some mice send an extra click
	// (a "bounce") as the button is let go.
	document.addEventListener("contextmenu", (e) => {
		if (e.shiftKey) return;
		if (start || moved || performance.now() - lastLineEnd < MENU_GRACE) e.preventDefault();
	});

	eraser.addEventListener("click", () => {
		strokes.length = 0;
		eraser.classList.remove("is-visible");
		redraw();
	});

	window.addEventListener("scroll", redraw, { passive: true });
	window.addEventListener("resize", resize);
	resize();
})();
