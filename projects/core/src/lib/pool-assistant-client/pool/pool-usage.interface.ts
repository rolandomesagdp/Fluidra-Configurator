export interface PoolUsage {
	periodOfUseMonths: Array<Months>;
	currentWaterTemperature: number;
	targetWaterTemperature: number;
	filtrationTime: number;

	powerSupplyType: PowerSupplyType;

	attendance: PoolPrivacy;
	collectiveAttendance?: {
		spa: boolean;
		river: boolean;
		waves: boolean;
		slides: boolean;
	};

	filtrationType: FiltrationType;

	/**
	 * @deprecated
	 */
	poolFiltrationTime?: number;
	/**
	 * @deprecated
	 */
	spaFiltrationTime?: number;
}

export enum Months {
	January = 'January',
	February = 'February',
	March = 'March',
	April = 'April',
	May = 'May',
	June = 'June',
	July = 'July',
	August = 'August',
	September = 'September',
	October = 'October',
	November = 'November',
	December = 'December',
}

export enum PoolPrivacy {
	PRIVATE = 'private',
	COLLECTIVE = 'collective',
}

export enum PowerSupplyType {
	SinglePhase = 'SinglePhase',
	ThreePhases = 'ThreePhases',
	BothPhases = 'BothSingleAnThreePhases',
}

export enum FiltrationType {
	SKIMMER = 'skimmer',
	BLOCK = 'block',
	OV_GUTTER = 'overflow-gutter',
	OV_WATERFALL = 'overflow-waterfall',
}
