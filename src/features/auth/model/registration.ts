import { createMutation } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { authApi, RegistrationParams, user, User } from '@/shared/api';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardResponse
} from '@/shared/types';

const registrationDomain = createDomain();

export const handlerFx = registrationDomain.effect<
	RegistrationParams,
	StandardResponse<User>
>();
handlerFx.use(authApi.registration);

export const mutation = createMutation<
	RegistrationParams,
	StandardResponse<User>,
	StandardSuccessResponse<User>,
	Error
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(user)),
});
