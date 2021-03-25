export default `
	const float PI = acos(0.0);
	const float TAU = 2.0 * PI;
	// in theory R is the radius of the globe, which by definition has circumference 1 here
	const float R = 0.5 / TAU;

	vec2 toMercator(vec3 p) {
		p /= sqrt(dot(p, p));
		return vec2(
			fract((atan(p.z, p.x) * R) + 2.0),
			R * 0.5 * log((1.0 + p.y) / (1.0 - p.y)) + 0.5
		);
	}

	vec3 fromMercator(vec2 p) {
		float longitude = p.x / R;
		float y = exp((p.y - 0.5) * 2.0 / R); 
		vec3 v = vec3(
			cos(longitude),
			(y - 1.0) / (y + 1.0),
			sin(longitude)
		);
		v.xz *= sqrt(1.0 - v.y * v.y);
		v /= sqrt(dot(v, v));
		return v;
	}

	mat2 rotation2d(float angle) {
		float s = sin(angle);
		float c = cos(angle);
		return mat2(
			c, -s,
			s, c
		);
	}

	vec2 mercatorRotator(
		vec2 m,
		float pole_long,
		float pole_lat,
		float spin
	) {
		vec3 xyz = fromMercator(m);
		xyz.xz *= rotation2d(spin);
		xyz.yz *= rotation2d(pole_lat - PI);
		xyz.xz *= rotation2d(pole_long);
		return toMercator(xyz);
	}

	uniform sampler2D tex_0_0;
	uniform sampler2D tex_0_1;
	uniform sampler2D tex_0_2;
	uniform sampler2D tex_0_3;
	uniform sampler2D tex_1_0;
	uniform sampler2D tex_1_1;
	uniform sampler2D tex_1_2;
	uniform sampler2D tex_1_3;
	uniform sampler2D tex_2_0;
	uniform sampler2D tex_2_1;
	uniform sampler2D tex_2_2;
	uniform sampler2D tex_2_3;
	uniform sampler2D tex_3_0;
	uniform sampler2D tex_3_1;
	uniform sampler2D tex_3_2;
	uniform sampler2D tex_3_3;
	vec4 mercatorTex(vec2 coords) {
		coords *= 4.0;
		if (coords.x < 1.0) {
			if (coords.y < 1.0) return texture2D(tex_0_0, coords);
			if (coords.y < 2.0) return texture2D(tex_0_1, coords - vec2(0.0, 1.0));
			if (coords.y < 3.0) return texture2D(tex_0_2, coords - vec2(0.0, 2.0));
			return texture2D(tex_0_3, coords - vec2(0.0, 3.0));
		}
		if (coords.x < 2.0) {
			if (coords.y < 1.0) return texture2D(tex_1_0, coords - vec2(1.0, 0.0));
			if (coords.y < 2.0) return texture2D(tex_1_1, coords - vec2(1.0, 1.0));
			if (coords.y < 3.0) return texture2D(tex_1_2, coords - vec2(1.0, 2.0));
			return texture2D(tex_1_3, coords - vec2(1.0, 3.0));
		}
		if (coords.x < 3.0) {
			if (coords.y < 1.0) return texture2D(tex_2_0, coords - vec2(2.0, 0.0));
			if (coords.y < 2.0) return texture2D(tex_2_1, coords - vec2(2.0, 1.0));
			if (coords.y < 3.0) return texture2D(tex_2_2, coords - vec2(2.0, 2.0));
			return texture2D(tex_2_3, coords - vec2(2.0, 3.0));
		}
		if (coords.y < 1.0) return texture2D(tex_3_0, coords - vec2(3.0, 0.0));
		if (coords.y < 2.0) return texture2D(tex_3_1, coords - vec2(3.0, 1.0));
		if (coords.y < 3.0) return texture2D(tex_3_2, coords - vec2(3.0, 2.0));
		return texture2D(tex_3_3, coords - vec2(3.0, 3.0));
	}
`;
