import { Record, Number, String, Static } from 'runtypes';

export const room = Record({
	id: Number,
	name: String,
	description: String,
}).asReadonly();

export interface Room extends Static<typeof room> {}
