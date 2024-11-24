import {
	DatesFiltersParams,
	InRoomParams,
	PaginationParams,
	SortParams
} from '@/shared/types';

import { User } from '../auth';

export interface ActivityActionDto {
	readonly id: number;
	readonly name: string;
}
export interface ActivitySphereDto {
	readonly id: number;
	readonly name: string;
}

export interface ActivityDto {
	readonly id: number;
	readonly roomId: number;
	readonly activist: User;
	readonly action: ActivityActionDto;
	readonly sphere: ActivitySphereDto;
	readonly createdAt: string;
}

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
