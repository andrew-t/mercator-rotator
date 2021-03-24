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
		float pole_lat
	) {
		vec3 xyz = fromMercator(m);
		xyz.yz *= rotation2d(pole_lat * TAU);
		xyz.xz *= rotation2d(pole_long * TAU);
		return toMercator(xyz);
	}
`;
