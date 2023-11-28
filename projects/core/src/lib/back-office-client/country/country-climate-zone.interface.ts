import { ClimateZone } from './climate-zone.interface';

export interface CountryClimateZone {
	id: number;
	code?: string;
	label?: string;

	map?: string;
	zones?: ClimateZone[];
}
