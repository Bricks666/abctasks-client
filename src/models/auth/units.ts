/* eslint-disable import/no-extraneous-dependencies */
import { createDomain } from 'effector-logger';
import { StandardResponse, VoidResponse } from '@/types/response';
import {
	AuthResponse,
	LoginRequest,
	RegistrationRequest,
	Tokens,
	User,
} from './types';

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
export const refreshFx = Auth.effect<void, StandardResponse<Tokens>>(
	'refreshFx'
);
