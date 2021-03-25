import utils from "./utils.js";

window.shaders = Object.assign({ rotated: `

#ifdef GL_ES
	precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

uniform float pole_long;
uniform float pole_lat;
uniform float spin;

${utils}

void main()
{
	// Normalized pixel coordinates (from 0 to 1)
	vec2 uv = gl_FragCoord.xy / u_resolution.x;
	uv.y -= (u_resolution.y / u_resolution.x - 1.0) / 2.0;
	// uv += 0.5;
	vec2 mercator = mercatorRotator(uv, pole_long + 0.5, pole_lat, spin + 1.72);
	// vec2 mercator = uv;
	gl_FragColor = mercatorTex(mercator);
}

` }, window.shaders);
