// Doodling: hold the right mouse button and drag anywhere on the page to draw.
// Drawings stay (and scroll with the page) until it is reloaded or left,
// or until the eraser button in the bottom left corner clears them.
// The parts of a line drawn on a home page project image stick to that image:
// they are kept in the image's own coordinates, drawn through its current
// transform (so they tilt and grow with it on hover, like ink on paper) and cut
// off at its edges. The parts drawn beside it stay on the page and pass under it.
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
	const SURFACES = ".showcase__media"; // elements a line sticks to when started on them

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

	// Strokes are kept in page coordinates, so they scroll with the content;
	// strokes on a surface are kept in that surface's untransformed coordinates
	const strokes = [];
	let stroke = null; // the stroke being drawn
	let start = null; // where the right button went down
	let moved = false; // whether the current right-press has drawn anything
	let lastLineEnd = -Infinity; // when the last line was finished
	let colorIndex = 0;
	let frame = 0;
	let animating = 0; // surfaces with strokes whose transform is changing

	// Page position of an element's untransformed box (offsets ignore transforms)
	function boxPosition(el) {
		let x = 0;
		let y = 0;
		for (let n = el; n; n = n.offsetParent) {
			x += n.offsetLeft;
			y += n.offsetTop;
		}
		return { x, y };
	}

	// Maps a surface's own coordinates to page coordinates, using its transform right now
	// (mid-transition values included)
	function surfaceMatrix(el) {
		const style = getComputedStyle(el);
		const [ox, oy] = style.transformOrigin.split(" ").map(parseFloat);
		const box = boxPosition(el);
		const t = style.transform === "none" ? new DOMMatrix() : new DOMMatrix(style.transform);
		return new DOMMatrix().translate(box.x + ox, box.y + oy).multiply(t).translate(-ox, -oy);
	}

	// A pointer position (client coordinates) in a stroke's own coordinates
	function toStroke(s, clientX, clientY) {
		const page = new DOMPoint(clientX + scrollX, clientY + scrollY);
		if (!s.surface) return { x: page.x, y: page.y };
		const local = page.matrixTransform(surfaceMatrix(s.surface).inverse());
		return { x: local.x, y: local.y };
	}

	// The surface under a pointer position, going by where it is drawn right now
	function surfaceAt(clientX, clientY) {
		const page = new DOMPoint(clientX + scrollX, clientY + scrollY);
		for (const el of document.querySelectorAll(SURFACES)) {
			const p = page.matrixTransform(surfaceMatrix(el).inverse());
			if (p.x >= 0 && p.y >= 0 && p.x <= el.offsetWidth && p.y <= el.offsetHeight) return el;
		}
		return null;
	}

	// Starts a piece of the current line on a surface (or on the page when null)
	function startPiece(surface, color, from, to) {
		stroke = { color, surface, points: [] };
		// On a surface, keep the line as wide on screen as on the page right now
		if (surface) {
			const m = surfaceMatrix(surface);
			stroke.scale = Math.hypot(m.a, m.b);
		}
		// Both ends of the crossing segment, so the pieces meet exactly at the edge
		stroke.points.push(toStroke(stroke, from.x, from.y), toStroke(stroke, to.x, to.y));
		strokes.push(stroke);
	}

	// Outline of a surface as it is drawn right now, in page coordinates
	function addSurfaceOutline(path, el, toPage) {
		const corners = [[0, 0], [el.offsetWidth, 0], [el.offsetWidth, el.offsetHeight], [0, el.offsetHeight]]
			.map(([x, y]) => new DOMPoint(x, y).matrixTransform(toPage));
		path.moveTo(corners[0].x, corners[0].y);
		for (const c of corners.slice(1)) path.lineTo(c.x, c.y);
		path.closePath();
	}

	// Each stroke takes the next colour from the palette
	function nextColor() {
		const names = ["--red", "--blue", "--yellow"];
		const value = getComputedStyle(root).getPropertyValue(names[colorIndex % names.length]).trim();
		colorIndex++;
		return value || "#a00d39";
	}

	function draw() {
		frame = 0;
		const dpr = window.devicePixelRatio || 1;
		const view = new DOMMatrix().scale(dpr).translate(-scrollX, -scrollY);
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		ctx.clearRect(0, 0, innerWidth, innerHeight);
		ctx.lineCap = "round";
		ctx.lineJoin = "round";
		const matrices = new Map();
		const surfaces = [...document.querySelectorAll(SURFACES)];
		// Page lines are cut out where the images are drawn now, so the images cover them
		let outside = null;
		if (surfaces.length && strokes.some((s) => !s.surface)) {
			outside = new Path2D();
			outside.rect(scrollX, scrollY, innerWidth, innerHeight);
			for (const el of surfaces) addSurfaceOutline(outside, el, surfaceMatrix(el));
		}
		for (const s of strokes) {
			// Page strokes only scroll; surface strokes also follow their surface's transform
			// (the line width too, so the ink grows with the image)
			let m = view;
			if (s.surface) {
				if (!matrices.has(s.surface)) matrices.set(s.surface, view.multiply(surfaceMatrix(s.surface)));
				m = matrices.get(s.surface);
			}
			ctx.save();
			ctx.setTransform(m);
			// Surface lines stop at the image's edges; page lines go around the images
			if (s.surface) {
				ctx.beginPath();
				ctx.rect(0, 0, s.surface.offsetWidth, s.surface.offsetHeight);
				ctx.clip();
			} else if (outside) {
				ctx.clip(outside, "evenodd");
			}
			ctx.lineWidth = WIDTH / (s.scale || 1);
			const pts = s.points;
			ctx.strokeStyle = s.color;
			ctx.beginPath();
			ctx.moveTo(pts[0].x, pts[0].y);
			// Smooth the line through the midpoints between samples
			for (let i = 1; i < pts.length - 1; i++) {
				const mx = (pts[i].x + pts[i + 1].x) / 2;
				const my = (pts[i].y + pts[i + 1].y) / 2;
				ctx.quadraticCurveTo(pts[i].x, pts[i].y, mx, my);
			}
			const end = pts[pts.length - 1];
			ctx.lineTo(end.x, end.y);
			ctx.stroke();
			ctx.restore();
		}
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
		if (animating) redraw();
	}

	function redraw() {
		if (!frame) frame = requestAnimationFrame(draw);
	}

	function resize() {
		const dpr = window.devicePixelRatio || 1;
		canvas.width = Math.round(innerWidth * dpr);
		canvas.height = Math.round(innerHeight * dpr);
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

	let last = null; // previous pointer position of the line being drawn
	document.addEventListener("pointermove", (e) => {
		if (!start || !(e.buttons & 2)) return;
		const here = { x: e.clientX, y: e.clientY };
		const surface = surfaceAt(here.x, here.y);
		if (!stroke) {
			if (Math.hypot(here.x - start.x, here.y - start.y) < MOVE_THRESHOLD) return;
			moved = true;
			startPiece(surfaceAt(start.x, start.y), nextColor(), start, here);
			root.classList.add("is-doodling");
			eraser.classList.add("is-visible");
		} else if (surface !== stroke.surface) {
			// Crossed an image's edge: finish this piece and go on in a new one, same colour
			stroke.points.push(toStroke(stroke, here.x, here.y));
			startPiece(surface, stroke.color, last, here);
		} else {
			stroke.points.push(toStroke(stroke, here.x, here.y));
		}
		last = here;
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
		animating = 0;
		eraser.classList.remove("is-visible");
		redraw();
	});

	// While a surface with strokes is changing its transform (the hover zoom),
	// redraw every frame so the strokes move with it
	const hasStrokes = (el) => strokes.some((s) => s.surface === el);
	document.addEventListener("transitionrun", (e) => {
		if (e.propertyName === "transform" && hasStrokes(e.target)) {
			animating++;
			redraw();
		}
	});
	const settle = (e) => {
		if (e.propertyName === "transform" && hasStrokes(e.target) && animating > 0) {
			animating--;
			redraw();
		}
	};
	document.addEventListener("transitionend", settle);
	document.addEventListener("transitioncancel", settle);

	window.addEventListener("scroll", redraw, { passive: true });
	window.addEventListener("resize", resize);
	resize();
})();
