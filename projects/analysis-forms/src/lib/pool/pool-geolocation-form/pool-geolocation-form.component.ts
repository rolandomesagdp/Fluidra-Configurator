import { CommonModule } from '@angular/common';
import {
	Component,
	NgModule,
	OnInit,
	OnDestroy,
	Input,
	OnChanges,
	SimpleChanges,
} from '@angular/core';
import {
	ReactiveFormsModule,
	FormGroup,
	FormsModule,
	ControlContainer,
	FormControl,
	AbstractControl,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';

import {
	ConfiguratorTranslateSharedModule,
	CountryService,
} from 'configurator-core';
import { Subject } from 'rxjs';

import { RadioButtonOption } from '../../radio-button-list/radio-button-option.interface';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';
import {
	ClimateZoneMapComponent,
	ClimateZoneMapModule,
	ClimateZoneMapComponentData,
} from '../../climate-zone-map';
import { RadioButtonModule } from '../../radio-button-list/radio-button';
import { TitleModule } from '../../configurator-forms';
import { MessageModule } from '../../message';

@Component({
	selector: 'fcc-pool-geolocation-form',
	templateUrl: './pool-geolocation-form.component.html',
	styleUrls: ['./pool-geolocation-form.component.scss'],
})
export class PoolGeolocationFormComponent
	implements OnInit, OnDestroy, OnChanges
{
	@Input({ required: true }) countryCode: string;
	poolGeolocationForm: FormGroup;

	private destroy$: Subject<void> = new Subject();
	public countryZonesButtons: RadioButtonOption[];

	constructor(
		private poolGeolocationFormContainer: ControlContainer,
		private dialog: MatDialog,
		private translateService: TranslateService
	) {}

	ngOnInit() {
		this.poolGeolocationForm = this.poolGeolocationFormContainer
			.control as FormGroup;
		this.loadCountryZonesButtons();
	}

	ngOnChanges(changes: SimpleChanges) {
		if (changes['countryCode']) {
			this.loadCountryZonesButtons();
		}
	}

	ngOnDestroy(): void {
		if (this.destroy$) {
			this.destroy$.next();
			this.destroy$.complete();
		}
	}

	needShowError(control: FormControl | AbstractControl, key?: string) {
		if (key && !control.hasError(key)) {
			return false;
		}

		return control.invalid && (control.touched || control.dirty);
	}

	private loadCountryZonesButtons() {
		this.countryZonesButtons = CountryService.getCountryClimateZone(
			this.countryCode
		)?.zones?.map((climateZone) => ({
			label: this.translateService.instant(
				'poolGeolocation.climateZone.zone_label',
				{
					code: climateZone.code,
				}
			),
			key: climateZone.code,
		}));
	}

	public getCountryMap() {
		return CountryService.getCountryClimateZone(this.countryCode)?.map;
	}

	public showClimateZoneMapDialog() {
		this.dialog.open<ClimateZoneMapComponent, ClimateZoneMapComponentData>(
			ClimateZoneMapComponent,
			{
				data: {
					map: this.getCountryMap(),
				},
			}
		);
	}
}

@NgModule({
	declarations: [PoolGeolocationFormComponent],
	imports: [
		CommonModule,
		FormsModule,
		ReactiveFormsModule,
		MatButtonModule,
		MatInputModule,
		MatIconModule,
		MatSelectModule,
		ConfiguratorTranslateSharedModule,
		ClimateZoneMapModule,
		RadioButtonModule,
		TitleModule,
		MessageModule,
	],
	exports: [PoolGeolocationFormComponent],
})
export class PoolGeolocationFormModule {}
