import { createQuery, createMutation } from '@farfetched/core';
import {
	StandardResponse,
	StandardSuccessResponse,
} from '@/interfaces/response/standardResponse';
import { authFx, loginFx, logoutFx, registrationFx } from './units';
import { AuthResponse, LoginRequest, RegistrationRequest } from './types';
import { getIsSuccessResponseContract } from '../contracts/isSuccessResponse';
import { VoidResponse } from '@/interfaces/response';

export const authQuery = createQuery<
	void,
	StandardResponse<AuthResponse>,
	Error,
	StandardSuccessResponse<AuthResponse>
>({
	effect: authFx,
	contract: getIsSuccessResponseContract(),
});

export const loginMutation = createMutation<
	LoginRequest,
	StandardResponse<AuthResponse>,
	StandardSuccessResponse<AuthResponse>,
	Error
>({
	effect: loginFx,
	contract: getIsSuccessResponseContract(),
});

export const registrationMutation = createMutation<
	RegistrationRequest,
	StandardResponse<VoidResponse>,
	StandardSuccessResponse<VoidResponse>,
	Error
>({
	effect: registrationFx,
	contract: getIsSuccessResponseContract(),
});

export const logoutMutation = createMutation<
	void,
	StandardResponse<boolean>,
	StandardSuccessResponse<boolean>,
	Error
>({
	effect: logoutFx,
	contract: getIsSuccessResponseContract(),
});
