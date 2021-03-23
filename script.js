import "./shaders/globe.js";
import "./shaders/rotated.js";
import "./glsl-canvas/component.js";

const globe = document.getElementById('globe'),
	rotated = document.getElementById('rotated');

globe.set({ texture: 'mercator-projection.jpg' });
rotated.set({ texture: 'mercator-projection.jpg' });

window.addEventListener('mousemove', e => {
	globe.set({
		pole_long: (e.clientX / window.innerWidth - 0.5) * 2,
		pole_lat: e.clientY / window.innerHeight - 0.5
	});
	rotated.set({
		pole_long: (e.clientX / window.innerWidth - 0.5) * 2,
		pole_lat: e.clientY / window.innerHeight - 0.5
	});
});
