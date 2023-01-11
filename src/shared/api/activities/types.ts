import { Literal, Number, Record, Static, String, Union } from 'runtypes';
import { InRoomParams, PaginationParams } from '@/shared/types';

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

export interface GetActivitiesInRoomParams
	extends InRoomParams,
		PaginationParams {
	readonly activistId?: number | null;
	readonly sphereName?: string | null;
	readonly before?: string | null;
	readonly after?: string | null;
	readonly action?: ActivityAction | null;
}
