import {
	DimensionCircular,
	DimensionIrregular,
	DimensionRectangular,
} from './pool-dimensions.interface';

export interface PoolCharacteristics {
	hasCover: boolean;
	shelter: boolean;
	shape: Shape;
	ground: string;
	place: string;
	type: string;
	heated: boolean;
	dimension?: DimensionRectangular & DimensionCircular & DimensionIrregular;
}

export type Shape = 'rectangular' | 'round' | 'custom';

export type PoolType = 'outdoor_pool' | 'indoor_pool' | 'spa'
