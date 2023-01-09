import { Runtype, Record, Number } from 'runtypes';

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
