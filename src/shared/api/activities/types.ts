import { Number, Record, Static, String } from 'runtypes';

import {
	DatesFiltersParams,
	InRoomParams,
	PaginationParams,
	SortParams
} from '@/shared/types';

import { user } from '../auth';

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
	activist: user,
	action: activityAction,
	sphere: activitySphere,
	createdAt: String,
}).asReadonly();

export interface Activity extends Static<typeof activity> {}

export interface GetActivitiesInRoomParams
	extends InRoomParams,
		PaginationParams,
		SortParams,
		DatesFiltersParams {
	readonly activistIds?: number[];
	readonly sphereIds?: number[];
	readonly actionIds?: number[];
}

export interface GetLastActivitiesInRoomParams extends InRoomParams {
	readonly count: number;
}
