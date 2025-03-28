import { StandardResponse } from '@/shared/types';

export interface UserDto {
	readonly id: number;
	readonly email: string;
	readonly username: string;
	readonly photo: string | null;
}
export type UsersDto = UserDto[];

export interface GetUsersRequestParams {
	readonly username?: string | null;
}
export type GetUsersResponseData = Promise<StandardResponse<UsersDto>>;
