interface Dimension {
	surface: number;
	volume: number;
}
export interface DimensionRectangular extends Dimension {
	length?: number;
	width?: number;
	depth?: number;
}
export interface DimensionCircular extends Dimension {
	diameter: number;
	depth: number;
}

export interface DimensionIrregular extends Dimension {}
