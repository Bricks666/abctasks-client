export type Query = {
	readonly [key: string]: QueryValue;
};

export type QueryValue = string | number | undefined | null;
