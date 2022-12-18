import { Literal, Number, Record, Static, String, Union } from 'runtypes';

export const activityType = Union(
	Literal('update'),
	Literal('create'),
	Literal('remove')
);
export type ActivityType = Static<typeof activityType>;

export const activitySphere = Union(Literal('task'), Literal('group'));
export type ActivitySphere = Static<typeof activitySphere>;

export const activity = Record({
	id: Number,
	roomId: Number,
	activistId: Number,
	type: activityType,
	sphere: activitySphere,
	createdAt: String,
}).asReadonly();

export interface Activity extends Static<typeof activity> {}
