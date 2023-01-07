import { createMutation } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { authApi, RegistrationRequest } from '@/shared/api';
import {
	StandardResponse,
	VoidResponse,
	StandardSuccessResponse,
	getStandardSuccessResponse,
	voidResponse
} from '@/shared/types';

const registrationDomain = createDomain();

export const handlerFx = registrationDomain.effect<
	RegistrationRequest,
	StandardResponse<VoidResponse>
>();
handlerFx.use(authApi.registration);

export const mutation = createMutation<
	RegistrationRequest,
	StandardResponse<VoidResponse>,
	StandardSuccessResponse<VoidResponse>,
	Error
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardSuccessResponse(voidResponse)),
});
