import { PoolCharacteristics } from './pool-characteristics.interface';
import { PoolGeneralInfo } from './pool-general-info.interface';
import { PoolGeolocation } from './pool-geolocation.interface';
import { PoolHeatingSolutions } from './pool-heating-solutions.interface';
import { PoolProductsAndBrands } from './pool-products-and-brands.interface';
import { PoolUsage } from './pool-usage.interface';

export interface Pool extends PoolGeneralInfo {
	email?: string;
	customerName?: string;
	countryCode?: string;
	phone?: string;
	characteristics?: PoolCharacteristics;
	geolocation?: PoolGeolocation;
	usage?: PoolUsage;
	productsAndBrands?: PoolProductsAndBrands;
	heatingSolutions?: PoolHeatingSolutions;
}
