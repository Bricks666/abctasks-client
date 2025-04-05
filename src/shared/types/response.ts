export interface StandardResponse<T> {
	readonly data: T;
	readonly statusCode: number;
}

export interface Paginated<T> {
	readonly items: T[];
	readonly totalCount: number;
	readonly limit: number;
}

export type PaginationResponse<T> = StandardResponse<Paginated<T>>;
