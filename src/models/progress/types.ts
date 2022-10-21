import { Number, Record, Static } from 'runtypes';

export const progress = Record({
	groupId: Number,
	completedCount: Number,
	totalCount: Number,
}).asReadonly();

export interface Progress extends Static<typeof progress> {}
