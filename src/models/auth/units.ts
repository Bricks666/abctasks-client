/* eslint-disable import/no-extraneous-dependencies */
import { combine, createDomain } from 'effector-logger';
import { createGate } from 'effector-react';
import { LoginRequest, RegistrationRequest } from '@/api';
import { StandardResponse, VoidResponse } from '@/types';
import { AuthResponse, User } from './types';

export const Auth = createDomain('AuthDomain');

export const $AuthUser = Auth.store<User | null>(null);
export const $AccessToken = Auth.store<string | null>(null);
export const $IsAuth = combine($AuthUser, (state) => !!state);

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

export const AuthGate = createGate({
	domain: Auth,
	name: 'authGate',
});
