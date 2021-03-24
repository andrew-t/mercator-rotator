export default function onDrag(el, cb) {
	let start, mousing = false;
	function updateStart(e) {
		start = { x: e.offsetX, y: e.offsetY };
		mousing = true;
	}
	el.addEventListener('mousedown', e => {
		if (touchId) return;
		updateStart(e);
	});
	function stop() {
		if (touchId) return;
		start = null;
		mousing = false;
	}
	el.addEventListener('mouseup', stop);
	el.addEventListener('mouseout', stop);
	el.addEventListener('mousemove', e => {
		if (!start) return;
		cb(e.offsetX - start.x, e.offsetY - start.y);
		updateStart(e);
	});
	let touchId;
	el.addEventListener("touchstart", e => {
		if (start) return;
		if (e.changedTouches.length != 1) return;
		const [touch] = e.changedTouches;
		touchId = touch.identifier;
		start = { x: touch.pageX, y: touch.pageY };
	});
	function stopTouch() {
		start = touchId = null;
	}
	el.addEventListener("touchend", stopTouch);
	el.addEventListener("touchcancel", stopTouch);
	el.addEventListener("touchmove", e => {
		for (const touch of e.changedTouches) if (touch.identifier == touchId) {
			cb(touch.pageX - start.x, touch.pageY - start.y);
			start = { x: touch.pageX, y: touch.pageY };
		}
	});
}
