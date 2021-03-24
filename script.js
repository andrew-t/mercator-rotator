import "./shaders/globe.js";
import "./shaders/rotated.js";
import "./glsl-canvas/component.js";

const map = document.getElementById('map'),
	globe = document.getElementById('globe'),
	rotated = document.getElementById('rotated'),
	rotatedCopy = document.getElementById('rotated-copy');

globe.set({ texture: 'mercator-projection.jpg' });
rotated.set({ texture: 'mercator-projection.jpg' });
rotated.glslCanvas.on('render', () => {
	rotatedCopy.src = rotated.canvas.toDataURL('image/png');
});

window.addEventListener('mousemove', e => {
	const vars = {
		pole_long: (e.clientX / window.innerWidth - 0.5) * 2,
		pole_lat: (e.clientY / window.innerHeight - 0.5) * 2
	};
	globe.set(vars);
	rotated.set(vars);
});
