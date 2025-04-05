import {
	DatesFiltersParams,
	InRoomParams,
	PaginationParams,
	PaginationResponse,
	SortParams,
	StandardResponse
} from '@/shared/types';

import { UserDto } from '../users';

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
	readonly activist: UserDto;
	readonly action: ActivityActionDto;
	readonly sphere: ActivitySphereDto;
	readonly createdAt: string;
}

export interface GetActivitiesInRoomRequestParams
	extends InRoomParams,
		PaginationParams,
		SortParams,
		DatesFiltersParams {
	readonly activistIds?: number[];
	readonly sphereIds?: number[];
	readonly actionIds?: number[];
}
export type GetActivitiesInRoomResponseData = Promise<
	PaginationResponse<ActivityDto>
>;

export type GetActivityActionsResponseData = Promise<
	StandardResponse<ActivityActionDto[]>
>;

export type GetActivitySpheresResponseData = Promise<
	StandardResponse<ActivitySphereDto[]>
>;
