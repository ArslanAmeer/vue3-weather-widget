export interface Weather {
	city?: string;
	country?: string;
	weatherMain: string;
	weatherDescription: string;
	temperature: number;
	maxTemperature?: number;
	minTemperature?: number;
	date: number;
	humidity: number;
	uvi: number;
	windSpeed: number;
	windDeg: number;
}
