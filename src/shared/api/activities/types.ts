import { Literal, Number, Record, Static, String, Union } from 'runtypes';

export const activityAction = Union(
	Literal('update'),
	Literal('create'),
	Literal('remove')
);
export type ActivityAction = Static<typeof activityAction>;

export const activitySphere = Record({
	id: Number,
	name: String,
}).asReadonly();

export type ActivitySphere = Static<typeof activitySphere>;

export const activity = Record({
	id: Number,
	roomId: Number,
	activistId: Number,
	action: activityAction,
	sphere: activitySphere,
	createdAt: String,
}).asReadonly();

export interface Activity extends Static<typeof activity> {}
