/* eslint-disable import/no-extraneous-dependencies */
import { createDomain } from 'effector-logger';
import { User } from '../User';
import { StandardResponse } from '@/interfaces/response/standardResponse';
import {
	AuthResponse,
	LoginRequest,
	RegistrationRequest,
	TokensResponse,
} from './types';
import { VoidResponse } from '@/interfaces/response';

export const Auth = createDomain('AuthDomain');

export const $AuthUser = Auth.store<User | null>(null);

export const $AccessToken = Auth.store<string | null>(null);

export const $IsAuth = $AuthUser.map<boolean>((state) => !!state);

export const $IsRegistered = Auth.store<boolean>(false);

export const loginFx = Auth.effect<
	LoginRequest,
	StandardResponse<AuthResponse>
>('loginFx');
export const authFx = Auth.effect<void, StandardResponse<AuthResponse>>(
	'authFx'
);
export const registrationFx = Auth.effect<
	RegistrationRequest,
	StandardResponse<VoidResponse>
>('registrationFx');
export const logoutFx = Auth.effect<void, StandardResponse<boolean>>(
	'logoutFx'
);
export const refreshFx = Auth.effect<void, StandardResponse<TokensResponse>>(
	'refreshFx'
);
