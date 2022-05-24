export function windDirection(degree: number) {
	const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
	return directions[Math.round(degree / 45) % 8];
}
