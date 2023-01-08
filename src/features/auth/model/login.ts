import { createMutation } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { authModel } from '@/entities/auth';
import {
	authApi,
	authResponse,
	AuthResponse,
	LoginRequest
} from '@/shared/api';
import { tokenModel } from '@/shared/configs';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardSuccessResponse
} from '@/shared/types';

const loginDomain = createDomain();

const handlerFx = loginDomain.effect<
	LoginRequest,
	StandardResponse<AuthResponse>
>();
handlerFx.use(authApi.login);

export const mutation = createMutation<
	LoginRequest,
	StandardResponse<AuthResponse>,
	StandardSuccessResponse<AuthResponse>,
	Error
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardSuccessResponse(authResponse)),
});

sample({
	clock: mutation.finished.success,
	fn: ({ result, }) => result.data.tokens.accessToken,
	target: tokenModel.setToken,
});

sample({
	clock: mutation.finished.success,
	fn: ({ result, }) => result.data.user,
	target: authModel.setUser,
});
