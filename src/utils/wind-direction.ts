/* 
	This custom function returns the Compass Sector for the Wind Direction in degrees
*/

export function windDirection(degree: number | undefined): string {
	if (degree) {
		const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
		return directions[Math.round(degree / 45) % 8];
	}

	return '';
}
