import utils from "./utils.js";

window.shaders = Object.assign({ globe: `

#ifdef GL_ES
	precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

uniform float pole_long;
uniform float pole_lat;
uniform float spin;

uniform sampler2D texture;

const float RADIUS = 0.35;
const float CAMERA_DISTANCE = 3.0;
const float PERSPECTIVE = 3.0;

const vec3 lightDirection = normalize(vec3(0.3, 0.8, 0.4));

${utils}

void main()
{
	// Normalized pixel coordinates
	vec2 uv = 2.1 * (gl_FragCoord.xy - u_resolution * 0.5) / u_resolution.y;

	float d = sqrt(dot(uv, uv));
	if (d > 1.0) {
		gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
		return;
	}

	float z = sqrt(1.0 - d * d);
	vec3 p = vec3(uv.x, z, uv.y);
	vec3 ray = normalize(vec3(uv.x, -PERSPECTIVE, uv.y));

	float light = dot(p, lightDirection);
	vec2 mercator = toMercator(p);
	mercator = mercatorRotator(mercator, pole_long + 0.5, pole_lat, spin);
	vec4 col = texture2D(texture, mercator);
	gl_FragColor = vec4(col.xyz * light, 1.0);
}

` }, window.shaders);
