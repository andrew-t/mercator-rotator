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
	// Normalized pixel coordinates (from 0 to 1)
	vec2 uv = (gl_FragCoord.xy - u_resolution * 0.5) / u_resolution.y;

	// Look across at earth like normal
	// vec3 p = vec3(0.0, 0.0, -CAMERA_DISTANCE);
	// vec3 ray = normalize(vec3(uv, PERSPECTIVE));

	// Look down on earth like UN flag
	vec3 p = vec3(0.0, CAMERA_DISTANCE, 0.0);
	vec3 ray = normalize(vec3(uv.x, -PERSPECTIVE, uv.y));

	for (int i = 0; i < 500; ++i) {
		float dist = sqrt(dot(p, p));
		if (dist < RADIUS + 0.0005) {
			float light = dot(p / dist, lightDirection);
			vec2 mercator = toMercator(p);
			mercator = mercatorRotator(mercator, pole_long + 0.5, pole_lat, spin);
			vec4 col = texture2D(texture, mercator);
			gl_FragColor = vec4(col.xyz * light, 1.0);
			return;
		}
		p += ray * (dist - RADIUS);
	}
	
	gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);
}

` }, window.shaders);
