import GlslCanvas from "./glsl-canvas.js";
import { shadowDom } from '../util/dom.js';

const style = `
	:host {
		display: block;
		box-sizing: border-box;
	}

	#canvas {
		width: 100%;
		height: 100%;
	}
`;

export class Component extends HTMLElement {
	constructor() {
		super();
		this.downscaling = parseFloat(this.getAttribute('downscaling')) || 1;
		this.shader = window.shaders[this.getAttribute('shader')];

		shadowDom(this, `
			<style>${style}</style>
			<canvas id="canvas"></canvas>
		`);

		this.glslCanvas = new GlslCanvas(this.canvas);
		this.glslCanvas.pause();
		this.glslCanvas.on('error', console.error);
		this.canvas.width = this.canvas.clientWidth * devicePixelRatio / this.downscaling;
		this.canvas.height = this.canvas.clientHeight * devicePixelRatio / this.downscaling;
		this.glslCanvas.load(this.shader);

		this.vars = {};
	}

	set(vars) {
		for (const key in vars)
			this.glslCanvas.setUniform(key, vars[key]);
		this.glslCanvas.play();
		setTimeout(() => this.glslCanvas.pause());
	}
}

window.customElements.define('glsl-canvas', Component);
