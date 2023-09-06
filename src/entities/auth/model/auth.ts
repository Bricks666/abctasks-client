import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, combine, sample } from 'effector';
import { createGate } from 'effector-react';

import { User, AuthResponse, authResponse, authApi } from '@/shared/api';
import { tokenModel } from '@/shared/configs';
import { dataExtractor } from '@/shared/lib';
import { StandardResponse, getStandardResponse } from '@/shared/types';

const authDomain = createDomain();

export const $user = authDomain.store<User | null>(null);
export const $isAuth = combine($user, (state) => !!state);
export const setUser = authDomain.event<User | null>();

const handlerFx = authDomain.effect<void, StandardResponse<AuthResponse>>(
	authApi.auth
);

export const query = createQuery<
	void,
	StandardResponse<AuthResponse>,
	Error,
	StandardResponse<AuthResponse>,
	AuthResponse
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(authResponse)),
	mapData: dataExtractor,
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
	fn: ({ result, }) => result.user,
	target: setUser,
});

sample({
	clock: query.finished.success,
	fn: ({ result, }) => result.tokens.accessToken,
	target: tokenModel.setToken,
});

sample({
	clock: Gate.open,
	target: [query.start],
});
