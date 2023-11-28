import { FormGroup } from '@angular/forms';
import { Pool } from './pool.interface';

export class PoolFactory {
	factoryPoolGeneralInfo(formGroup: FormGroup): Pool {
		const pool: Pool = {
			id: undefined,

			name: formGroup?.getRawValue()?.name,
			email: formGroup?.getRawValue()?.email,
			customerName: formGroup?.getRawValue()?.customerName,
			countryCode: formGroup?.getRawValue()?.countryCode,
			phone: formGroup?.getRawValue()?.phone,

			// TODO: Check if need check by factory if is needed set current professional or clear field for non admin users
			professional: formGroup?.getRawValue()?.professional?.id,

			// TODO: Check if this is automatic filled by api or check injection date formatter
			date: '24/10/2023',

			draft: true,

			characteristics: {
				hasCover: undefined,
				shelter: undefined,
				shape: undefined,
				ground: undefined,
				place: undefined,
				type: undefined,
				heated: undefined,
			},

			geolocation: {
				altitude: undefined,
				climateZone: undefined,

				countryCode: undefined,
				latitude: undefined,
				locality: undefined,
				longitude: undefined,
				wind: undefined,
				zipCode: undefined,
			},
		};

		return pool;
	}
}
