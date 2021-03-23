export default `
	const float PI = acos(0.0);
	const float TAU = 2.0 * PI;
	const float LAT_SCALE = 0.175; //0.25 / tan(PI * 85.0 / 180.0);

	vec2 toMercator(vec3 p) {
		p /= sqrt(dot(p, p));
		return vec2(
			fract((atan(p.z, p.x) / PI / 4.0) + 2.0),
			LAT_SCALE * p.y / sqrt(dot(p.xz, p.xz)) + 0.5
		);
	}

	vec3 fromMercator(vec2 p) {
		float longitude = PI * 4.0 * p.x;
		vec3 v = vec3(
			cos(longitude),
			(p.y - 0.5) / LAT_SCALE,
			sin(longitude)
		);
		return v / sqrt(dot(v, v));
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
		float pole_lat
	) {
		vec3 xyz = fromMercator(m);
		xyz.yz *= rotation2d(pole_lat * TAU);
		xyz.xz *= rotation2d(pole_long * TAU);
		return toMercator(xyz);
	}
`;
