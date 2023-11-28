import { COUNTRIES } from './country';
import { CountryClimateZone } from './country-climate-zone.interface';
import { COUNTRIES_CLIMATIC_ZONES } from './country-zones';
import { Country } from './country.interface';

export class CountryService {
	public static getCountries(): Country[] {
		return COUNTRIES;
	}

	public static getCountry(countryCode: string): Country {
		return COUNTRIES.find((country) => country.code === countryCode);
	}

	public static getCountriesWithPhonePrefix(): Country[] {
		return this.getCountries().filter((country) => country.phonePrefix);
	}

	public static getCountriesWithClimateZones(): Country[] {
		return this.getCountries().filter((country) => country.climateZone);
	}

	public static getCountryClimateZone(countryCode: string): CountryClimateZone {
		const climateZoneId = this.getCountriesWithClimateZones().find(
			(country) => country.code === countryCode
		)?.climateZone;

		return this.getCountriesClimateZones().find(
			(climateZone) => climateZone.id === climateZoneId
		);
	}

	public static getCountriesClimateZones(): CountryClimateZone[] {
		return COUNTRIES_CLIMATIC_ZONES;
	}
}
