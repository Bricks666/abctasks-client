import { StandardResponse } from '@/shared/types';

export interface TagDto {
	readonly id: number;
	readonly roomId: number;
	readonly name: string;
	readonly mainColor: string;
	readonly secondColor: string;
}
export type TagsDto = TagDto[];

export interface GetAllTagsRequestParams {
	readonly roomId: number;
}
export type GetAllTagsResponseData = Promise<StandardResponse<TagsDto>>;

export interface GetTagRequestParams {
	readonly id: number;
	readonly roomId: number;
}
export type GetTagResponseData = Promise<StandardResponse<TagDto>>;

export interface CreateTagRequestParams {
	readonly roomId: number;
	readonly name: string;
	readonly mainColor: string;
	readonly secondColor: string;
}
export type CreateTagResponseData = Promise<StandardResponse<TagDto>>;

export interface UpdateTagRequestParams {
	readonly id: number;
	readonly roomId: number;
	readonly name?: string;
	readonly mainColor?: string;
	readonly secondColor?: string;
}
export type UpdateTagResponseData = Promise<StandardResponse<TagDto>>;

export interface RemoveTagRequestParams {
	readonly id: number;
	readonly roomId: number;
}
export type RemoveTagResponseData = Promise<StandardResponse<boolean>>;
