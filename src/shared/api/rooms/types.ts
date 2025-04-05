import { StandardResponse } from '@/shared/types';

export interface RoomDto {
	readonly id: number;
	readonly ownerId: number;
	readonly name: string;
	readonly description: string;
	readonly canChange: boolean | null;
}
export type RoomsDto = RoomDto[];

export type GetRoomsResponseData = Promise<StandardResponse<RoomsDto>>;

export interface GetRoomRequestParams {
	readonly roomId: number;
}
export type GetRoomResponseData = Promise<StandardResponse<RoomDto>>;

export interface CreateRoomRequestParams {
	readonly name: string;
	readonly description: string;
}
export type CreateRoomResponseData = Promise<StandardResponse<RoomDto>>;

export interface UpdateRoomRequestParams {
	readonly roomId: number;
	readonly name: string;
	readonly description: string;
}
export type UpdateRoomResponseData = Promise<StandardResponse<RoomDto>>;

export interface RemoveRoomRequestParams {
	readonly roomId: number;
}
export type RemoveRoomResponseData = Promise<StandardResponse<boolean>>;
