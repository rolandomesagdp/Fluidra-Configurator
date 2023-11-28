export interface PoolGeolocation {
	latitude: number;
	longitude: number;
	locality: string;
	countryCode: string;
	zipCode: string;
	altitude: number;
	climateZone: ClimateZoneType;
	wind: Wind;
}

export type ClimateZoneType =
	| 'rigorous'
	| 'temperate'
	| 'mild'
	| 'antilles'
	| 'pacific';

export type Wind = 'low' | 'medium' | 'high';
