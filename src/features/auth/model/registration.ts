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

export const registrationFx = registrationDomain.effect<
	RegistrationRequest,
	StandardResponse<VoidResponse>
>('registrationFx');
registrationFx.use(authApi.registration);

export const registrationMutation = createMutation<
	RegistrationRequest,
	StandardResponse<VoidResponse>,
	StandardSuccessResponse<VoidResponse>,
	Error
>({
	effect: registrationFx,
	contract: runtypeContract(getStandardSuccessResponse(voidResponse)),
});