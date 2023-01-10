export interface Path {
	readonly url: string | number | Array<string | number>;
	readonly query?: Record<string, string | number | null>;
}

export interface AccessOptions {
	readonly accessToken?: string | null;
}
