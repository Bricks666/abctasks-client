import { Runtype, Record, Null, Number, String, Static, Union } from 'runtypes';

export const getStandardSuccessResponse = <RT>(T: Runtype<RT>) => {
	return Record({
		data: T,
		errorMessage: Null,
		statusCode: Number,
	}).asReadonly();
};

export interface StandardSuccessResponse<T> {
	readonly data: T;
	readonly errorMessage: null;
	readonly statusCode: number;
}

export const standardFailResponse = Record({
	data: Null,
	errorMessage: String,
	statusCode: Number,
}).asReadonly();

export type StandardFailResponse = Static<typeof standardFailResponse>;

export const getStandardResponse = <RT>(T: Runtype<RT>) => {
	return Union(getStandardSuccessResponse(T), standardFailResponse);
};

export type StandardResponse<T> =
	| StandardFailResponse
	| StandardSuccessResponse<T>;
