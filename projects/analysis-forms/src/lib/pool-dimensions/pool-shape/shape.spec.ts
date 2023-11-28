import { RectangularShape } from './rectangular-shape';
import { RoundShape } from './round-shape';

describe('Pool Surface and Volume calculation', () => {
	describe('Round Shape', () => {
		it('Should properly calculate the volume of a rectangular pool', () => {
			let shapeCalculator = new RoundShape(2, 2);

			expect(shapeCalculator.getVolume()).toEqual(6.28);
		});

		it('Should properly calculate the volume of a rectangular pool', () => {
			let shapeCalculator = new RoundShape(null, null);

			expect(shapeCalculator.getVolume()).toEqual(null);
		});

		it('Should properly calculate the surface of a rectangular pool', () => {
			let shapeCalculator = new RoundShape(2, 2);

			expect(shapeCalculator.getSurface()).toEqual(3.14);
		});

		it('Should properly calculate the surface of a rectangular pool', () => {
			let shapeCalculator = new RoundShape(null, null);

			expect(shapeCalculator.getSurface()).toEqual(null);
		});
	});

	describe('Rectangular Shape', () => {
		it('Should properly calculate the volume of a rectangular pool', () => {
			let shapeCalculator = new RectangularShape(2, 2, 2);

			expect(shapeCalculator.getVolume()).toEqual(8);
		});

		it('Should properly calculate the volume of a rectangular pool', () => {
			let shapeCalculator = new RectangularShape(null, null, null);

			expect(shapeCalculator.getVolume()).toEqual(null);
		});

		it('Should properly calculate the surface of a rectangular pool', () => {
			let shapeCalculator = new RectangularShape(2, 2, 2);

			expect(shapeCalculator.getSurface()).toEqual(4);
		});

		it('Should properly calculate the surface of a rectangular pool', () => {
			let shapeCalculator = new RectangularShape(null, null, null);

			expect(shapeCalculator.getSurface()).toEqual(null);
		});
	});
});
