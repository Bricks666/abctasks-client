import { Number, Record, Static, String } from 'runtypes';
import { InRoomParams, PaginationParams, SortParams } from '@/shared/types';

export const activityAction = Record({
	id: Number,
	name: String,
}).asReadonly();

export interface ActivityAction extends Static<typeof activityAction> {}

export const activitySphere = Record({
	id: Number,
	name: String,
}).asReadonly();

export interface ActivitySphere extends Static<typeof activitySphere> {}

export const activity = Record({
	id: Number,
	roomId: Number,
	activistId: Number,
	actionId: Number,
	sphereId: Number,
}).asReadonly();

export interface Activity extends Static<typeof activity> {}

export interface GetActivitiesInRoomParams
	extends InRoomParams,
		PaginationParams,
		SortParams {
	readonly activistIds?: number[] | null;
	readonly sphereIds?: number[] | null;
	readonly actionIds?: number[] | null;
	readonly before?: string | null;
	readonly after?: string | null;
}

export interface GetLastActivitiesInRoomParams extends InRoomParams {
	readonly count: number;
}
