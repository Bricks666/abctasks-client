/* eslint-disable import/no-extraneous-dependencies */
import { combine, createDomain } from 'effector';
import { createGate } from 'effector-react';
import { AuthResponse, User } from '@/shared/api';
import { StandardResponse } from '@/shared/types';

export const Auth = createDomain('AuthDomain');

export const $AuthUser = Auth.store<User | null>(null);
export const $AccessToken = Auth.store<string | null>(null);
export const $IsAuth = combine($AuthUser, (state) => !!state);

export const authFx = Auth.effect<void, StandardResponse<AuthResponse>>(
	'authFx'
);

export const logoutFx = Auth.effect<void, StandardResponse<boolean>>(
	'logoutFx'
);

export const AuthGate = createGate({
	domain: Auth,
	name: 'authGate',
});
