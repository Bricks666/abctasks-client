export interface Path {
	readonly url: string | number | Array<string | number>;
	readonly query?: Record<string, string>;
}

export interface AccessOptions {
	readonly accessToken?: string | null;
}
