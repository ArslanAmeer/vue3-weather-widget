/* 
    This custom function returns the speed in kilometers per hour from the speed in miles per hour.
*/
export function mpsToKph(mps: number) {
	return Math.round(mps * 3.6);
}

/* 
    This custom function returns the speed in miles per hour from the speed in kilometers per hour.
*/
export function kphToMps(kph: number) {
	return Math.round(kph / 3.6);
}
