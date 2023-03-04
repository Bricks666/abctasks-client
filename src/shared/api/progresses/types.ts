import { Number, Record, Static } from 'runtypes';

export const progress = Record({
	tagId: Number,
	donecount: Number,
	totalcount: Number,
}).asReadonly();

export interface Progress extends Static<typeof progress> {}
