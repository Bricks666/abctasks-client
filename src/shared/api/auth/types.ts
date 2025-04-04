import type { StandardResponse } from '@/shared/types';

import type { UserDto } from '../users';

export interface TokensDto {
	readonly refreshToken: string;
	readonly accessToken: string;
}

export interface AuthResponseDto {
	readonly user: UserDto;
	readonly tokens: TokensDto;
}

export type AuthResponseData = Promise<StandardResponse<AuthResponseDto>>;

export interface LoginRequestParams {
	readonly email: string;
	readonly password: string;
	readonly rememberMe: boolean;
}
export type LoginResponseData = Promise<StandardResponse<AuthResponseDto>>;

export interface RegistrationRequestParams {
	readonly email: string;
	readonly username: string;
	readonly password: string;
}
export type RegistrationResponseData = Promise<StandardResponse<UserDto>>;

export interface ActivateUserRequestParams {
	readonly token: string;
}
export type ActivateUserResponseData = Promise<StandardResponse<boolean>>;

export type LogoutResponseData = Promise<StandardResponse<boolean>>;
