/** Keeps the types of properties of a type but assigns type of Spy to the methods */
export type SpyOf<T> = Partial<{
	-readonly [k in keyof T]?: T[k];
}> &
	Partial<{
		[k in keyof T]: T[k] extends (...args: unknown[]) => unknown
			? jasmine.Spy
			: T[k];
	}>;
