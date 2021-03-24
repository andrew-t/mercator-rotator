import "./shaders/globe.js";
import "./shaders/rotated.js";
import "./glsl-canvas/component.js";
import drag from "./drag.js";

const globe = document.getElementById('globe'),
	rotated = document.getElementById('rotated'),
	latLong = document.getElementById('lat-long');

let pole_lat = Math.PI * 0.5, pole_long = 0, spin = 0;

drag(globe, (x, y) => {
	pole_long -= x * 0.02;
	pole_lat += y * 0.02;
	if (pole_lat < -Math.PI * 0.5) pole_lat = -Math.PI * 0.5;
	if (pole_lat > Math.PI * 0.5) pole_lat = Math.PI * 0.5;
	globe.set({ pole_long, pole_lat, spin: 0 });
	rotated.set({ pole_long, pole_lat, spin });
});

function deg(rad) {
	return (rad * 180 / Math.PI).toFixed(5);
}

drag(rotated, (x) => {
	spin -= x * 0.02;
	globe.set({ pole_long, pole_lat, spin });
	rotated.set({ pole_long, pole_lat, spin });
});

setTimeout(() => {
	const vars = {
		texture: 'mercator-projection.jpg',
		pole_long, pole_lat, spin
	};
	globe.set(vars);
	rotated.set(vars);
});