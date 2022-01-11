/* eslint-disable @typescript-eslint/no-explicit-any */
export type HEX = `#${string}`;

/* TODO: Изменить типизацию на более конкретную */
export type DateType = string;

export interface OnlyClassName {
	className?: string;
}

export type MappedObject<V> = {
	[key: string]: V;
};
export type AnyObject = MappedObject<any>;
