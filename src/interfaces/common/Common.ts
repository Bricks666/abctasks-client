/* eslint-disable @typescript-eslint/no-explicit-any */
export type HEX = `#${string}`;

/* TODO: Изменить типизацию на более конкретную */
export type DateType = string;

export interface ClassNameComponent {
	readonly className?: string;
}

export type MappedObject<V> = {
	[key: string]: V;
};
export type AnyObject = MappedObject<any>;

export type ExtractProps<
	T extends (...args: any[]) => any,
	K extends keyof Parameters<T>[0] = never
> = Omit<Parameters<T>[0], K>;
