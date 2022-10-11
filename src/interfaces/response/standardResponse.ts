export interface StandardSuccessResponse<T> {
	readonly data: T;
	readonly errorMessage: null;
	readonly statusCode: number;
}

export interface StandardFailResponse {
	readonly data: null;
	readonly errorMessage: string;
	readonly statusCode: number;
}

export type StandardResponse<T> =
	| StandardFailResponse
	| StandardSuccessResponse<T>;
