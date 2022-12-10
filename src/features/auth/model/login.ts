import { createMutation } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { authResponse, AuthResponse, LoginRequest } from '@/shared/api';
import { tokenModel } from '@/shared/configs';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardSuccessResponse
} from '@/shared/types';

const loginDomain = createDomain();

export const loginFx = loginDomain.effect<
	LoginRequest,
	StandardResponse<AuthResponse>
>('loginFx');

export const loginMutation = createMutation<
	LoginRequest,
	StandardResponse<AuthResponse>,
	StandardSuccessResponse<AuthResponse>,
	Error
>({
	effect: loginFx,
	contract: runtypeContract(getStandardSuccessResponse(authResponse)),
});

sample({
	clock: loginMutation.finished.success,
	fn: ({ result, }) => result.data.tokens.accessToken,
	target: tokenModel.setToken,
});
