export interface PoolHeatingSolutions {
	heatPump: boolean;
	heatPumpInTechnicalRoom: boolean;
	electricHeater: boolean;
	heatExchanger: boolean;
	heatExchangerEnergyType: EnergyType;
	heatExchangerType: ExchangerTypes;
	heatExchangerOtherName: string;
	heatExchangerOtherPricing: number;
	heatExchangerOtherEfficiency: number;
	basicPricing: boolean;
	personalizedPricing: PersonalizedPricing;
}

export interface PersonalizedPricing {
	currency: number;
	kwhFullHour: number;
	kwhOffPeakHour: number;
	naturalGasKwh: number;
	naturalGasEfficiency: number;
	propaneGasKwh: number;
	propaneGasEfficiency: number;
	fuelLiter: number;
	fuelGasEfficiency: number;
	tempoPrice: number;
}

export type EnergyType =
	| 'NaturalGas'
	| 'PropaneGas'
	| 'Fuel'
	| 'AerothermyGeothermy'
	| 'Other';

export type ExchangerTypes = 'Low 45º' | 'Medium 60º' | 'High 80º - 90º';
