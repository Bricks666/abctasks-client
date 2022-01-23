/* eslint-disable @typescript-eslint/no-explicit-any */
export type HEX = `#${string}`;

/* TODO: Изменить типизацию на более конкретную */
export type DateType = string;

export interface ClassNameComponent {
	className?: string;
}

export type MappedObject<V> = {
	[key: string]: V;
};
export type AnyObject = MappedObject<any>;

/* TODO: Придумать, куда переместить структуру */
export interface GroupStructure {
	group: string;
	textColor: HEX;
	backgroundColor: HEX;
}
