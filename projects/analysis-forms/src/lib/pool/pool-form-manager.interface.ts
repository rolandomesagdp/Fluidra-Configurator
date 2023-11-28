import { FormGroup } from '@angular/forms';
import { Pool } from 'configurator-core';

export interface PoolFormManager {
	formGroup: FormGroup;

	pool?: Pool;
}
