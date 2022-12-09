import { createQuery, createMutation } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { Boolean } from 'runtypes';
import { getIsSuccessResponseValidator } from '../utils/isSuccessResponse';
import { authResponse, AuthResponse } from './types';
import { authFx, logoutFx } from './units';
import {
	getStandardSuccessResponse,
	StandardResponse,
	StandardSuccessResponse
} from '@/types';

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

export const logoutMutation = createMutation<
	void,
	StandardResponse<boolean>,
	StandardSuccessResponse<boolean>,
	Error
>({
	effect: logoutFx,
	contract: runtypeContract(getStandardSuccessResponse(Boolean)),
});
