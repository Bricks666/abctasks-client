import { createQuery, createMutation } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { Boolean } from 'runtypes';
import {
	getStandardSuccessResponse,
	StandardResponse,
	StandardSuccessResponse,
} from '@/interfaces/response/standardResponse';
import { authFx, loginFx, logoutFx, registrationFx } from './units';
import {
	authResponse,
	AuthResponse,
	LoginRequest,
	RegistrationRequest,
} from './types';
import { getIsSuccessResponseValidator } from '../validation/isSuccessResponse';
import { voidResponse, VoidResponse } from '@/interfaces/response';

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

export const loginMutation = createMutation<
	LoginRequest,
	StandardResponse<AuthResponse>,
	StandardSuccessResponse<AuthResponse>,
	Error
>({
	effect: loginFx,
	contract: runtypeContract(getStandardSuccessResponse(authResponse)),
});

export const registrationMutation = createMutation<
	RegistrationRequest,
	StandardResponse<VoidResponse>,
	StandardSuccessResponse<VoidResponse>,
	Error
>({
	effect: registrationFx,
	contract: runtypeContract(getStandardSuccessResponse(voidResponse)),
});

export const logoutMutation = createMutation<
	void,
	StandardResponse<boolean>,
	StandardSuccessResponse<boolean>,
	Error
>({
	effect: logoutFx,
	contract: runtypeContract(getStandardSuccessResponse(Boolean)),
});
