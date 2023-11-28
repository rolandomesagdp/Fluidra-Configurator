import { SpyOf } from './spyof.interface';

/** Create an object with methods that are autoSpy-ed to use as mock dependency */
export function autoSpy<T>(
	obj: new (...args: unknown[]) => T,
	synthetic?: string[]
): SpyOf<T> {
	const res: SpyOf<T> = {} as SpyOf<T>;

	// turns out that in target:es2015 the methods attached to the prototype are not enumerable so Object.keys returns []. So to workaround that and keep some backwards compatibility - merge with ownPropertyNames - that disregards the enumerable property.
	// the Set remove duplicate entries
	const keys = new Set([
		...(Object.keys(obj.prototype) as Array<keyof T>),
		...(Object.getOwnPropertyNames(obj.prototype) as Array<keyof T>),
		...((synthetic || []) as Array<keyof T>),
	]);

	keys.forEach((key) => {
		if (typeof key === 'string') {
			(res[key] as unknown) = jasmine.createSpy(key, (obj as T)[key] as any);
		}
	});

	return res;
}
