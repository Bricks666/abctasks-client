import { Runtype, Record, Number, Array } from 'runtypes';

export const getStandardResponse = <RT>(T: Runtype<RT>) => {
	return Record({
		data: T,
		statusCode: Number,
	}).asReadonly();
};

export interface StandardResponse<T> {
	readonly data: T;
	readonly statusCode: number;
}

export const getPaginationResponse = <RT>(T: Runtype<RT>) => {
	return Record({
		items: Array(T),
		totalCount: Number,
		limit: Number,
	}).asReadonly();
};

export interface PaginationResponse<T> {
	readonly items: T[];
	readonly totalCount: number;
	readonly limit: number;
}
