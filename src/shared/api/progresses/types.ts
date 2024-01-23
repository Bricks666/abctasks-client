import { Number, Record, Static } from 'runtypes';

import { tag } from '../tags';

export const progress = Record({
	tag,
	donecount: Number,
	totalcount: Number,
}).asReadonly();

export interface Progress extends Static<typeof progress> {}
