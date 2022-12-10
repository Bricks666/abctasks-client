import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, combine, sample } from 'effector';
import { createGate } from 'effector-react';
import { User, AuthResponse, authResponse, authApi } from '@/shared/api';
import { getIsSuccessResponseValidator } from '@/shared/models/utils';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardSuccessResponse
} from '@/shared/types';

export const authDomain = createDomain('AuthDomain');

export const $authUser = authDomain.store<User | null>(null);
export const $isAuth = combine($authUser, (state) => !!state);
export const setAuthUser = authDomain.event<User | null>();

export const authFx = authDomain.effect<void, StandardResponse<AuthResponse>>(
	'authFx'
);
authFx.use(authApi.auth);

export const authQuery = createQuery<
	void,
	StandardResponse<AuthResponse>,
	Error,
	StandardSuccessResponse<AuthResponse>,
	void
>({
	effect: authFx,
	contract: runtypeContract(getStandardSuccessResponse(authResponse)),
	validate: getIsSuccessResponseValidator(),
});

export const AuthGate = createGate({
	domain: authDomain,
	name: 'authGate',
});

sample({
	clock: setAuthUser,
	target: $authUser,
});

sample({
	clock: [authQuery.finished.success],
	fn: ({ result, }) => result.data.user,
	target: setAuthUser,
});

sample({
	clock: AuthGate.open,
	target: [authQuery.start],
});
