import { createMutation } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { authResponse, AuthResponse, LoginRequest } from '@/shared/api';
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
