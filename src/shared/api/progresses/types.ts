import { Number, Record, Static, Union, String } from 'runtypes';

export const progress = Record({
	groupId: Number,
	completedCount: Union(Number, String),
	totalCount: Union(Number, String),
}).asReadonly();

export interface Progress extends Static<typeof progress> {}
