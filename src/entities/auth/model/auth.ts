import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, combine, sample } from 'effector';
import { createGate } from 'effector-react';
import { User, AuthResponse, authResponse, authApi } from '@/shared/api';
import { tokenModel } from '@/shared/configs';
import { getIsSuccessResponseValidator } from '@/shared/lib';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardSuccessResponse
} from '@/shared/types';

const authDomain = createDomain();

export const $user = authDomain.store<User | null>(null);
export const $isAuth = combine($user, (state) => !!state);
export const setUser = authDomain.event<User | null>();

const handlerFx = authDomain.effect<void, StandardResponse<AuthResponse>>();
handlerFx.use(authApi.auth);

export const query = createQuery<
	void,
	StandardResponse<AuthResponse>,
	Error,
	StandardSuccessResponse<AuthResponse>,
	void
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardSuccessResponse(authResponse)),
	validate: getIsSuccessResponseValidator(),
});

export const Gate = createGate({
	domain: authDomain,
});

sample({
	clock: setUser,
	target: $user,
});

sample({
	clock: [query.finished.success],
	fn: ({ result, }) => result.data.user,
	target: setUser,
});

sample({
	clock: query.finished.success,
	fn: ({ result, }) => result.data.tokens.accessToken,
	target: tokenModel.setToken,
});

sample({
	clock: Gate.open,
	target: [query.start],
});

query.finished.success.watch(console.log);
