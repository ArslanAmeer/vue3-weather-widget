export interface Weather {
	city: string;
	country: string;
	weatherMain: string;
	weatherDescription: string;
	weatherId: number;
	weatherIcon: string;
	temperature: number;
	date: number;
	humidity: number;
	uvi: number;
	windSpeed: number;
	windDeg: number;
}

export interface WeatherSummary {
	weatherMain: string;
	weatherDescription: string;
	weatherId: number;
	weatherIcon: string;
	maxTemperature: number;
	minTemperature: number;
	date: number;
}
