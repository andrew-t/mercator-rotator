import "./shaders/globe.js";
import "./shaders/rotated.js";
import "./glsl-canvas/component.js";
import drag from "./drag.js";

const globe = document.getElementById('globe'),
	rotated = document.getElementById('rotated'),
	latLong = document.getElementById('lat-long');

let pole_lat = Math.PI * 0.5, pole_long = 0, spin = 0, map_y = 0;

function deg(rad) {
	return (rad * 180 / Math.PI).toFixed(5);
}

function delay(n) { return new Promise(r => setTimeout(r, n)); }
function loadImage(url) {
	return new Promise(resolve => {
		const i2 = new Image();
		i2.addEventListener('load', e => resolve(i2));
		i2.src = url;
	});
}

loadImage('mercator.jpg').then(async img => {
	canvas.width = canvas.height = '256';
	const ctx = canvas.getContext('2d');
	for (let x = 0; x < 4; ++x)
		for (let y = 0; y < 4; ++y) {
			ctx.drawImage(img,
				x * img.width / 4,
				y * img.height / 4,
				img.width / 4,
				img.height / 4,
				0, 0, 256, 256
			);
			await delay(10);
			const n = `tex_${x}_${3 - y}`,
				i2 = await loadImage(canvas.toDataURL('image/png'));
			globe.glslCanvas.loadTexture(n, i2);
			rotated.glslCanvas.loadTexture(n, i2);
		}
	const vars = { pole_long, pole_lat, spin };
	globe.set(vars);
	rotated.set(vars);

	drag(globe, (x, y) => {
		pole_long -= x * 0.02;
		pole_lat += y * 0.02;
		if (pole_lat < -Math.PI * 0.5) pole_lat = -Math.PI * 0.5;
		if (pole_lat > Math.PI * 0.5) pole_lat = Math.PI * 0.5;
		globe.set({ pole_long, pole_lat, spin: 0 });
		rotated.set({ pole_long, pole_lat, spin, map_y });
	});

	drag(rotated, (x, y) => {
		spin -= x * 0.02;
		map_y += y * 0.005;
		globe.set({ pole_long, pole_lat, spin });
		rotated.set({ pole_long, pole_lat, spin, map_y });
	});
});
