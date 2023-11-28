export interface Product {
	brand: string;
	price: number;
	name: string;
	type: ProductType;
}

export type ProductType = 'heatPump' | 'electricHeater' | 'heatExchanger';
