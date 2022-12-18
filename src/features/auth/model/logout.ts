import { createMutation } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { Boolean } from 'runtypes';
import { authModel } from '@/entities/auth';
import { authApi } from '@/shared/api';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardSuccessResponse
} from '@/shared/types';

const logoutDomain = createDomain();

export const logoutFx = logoutDomain.effect<void, StandardResponse<boolean>>(
	'logoutFx'
);
logoutFx.use(authApi.logout);

export const logoutMutation = createMutation<
	void,
	StandardResponse<boolean>,
	StandardSuccessResponse<boolean>,
	Error
>({
	effect: logoutFx,
	contract: runtypeContract(getStandardSuccessResponse(Boolean)),
});

sample({
	clock: logoutMutation.finished.success,
	filter: ({ result, }) => globalThis.Boolean(result.data),
	fn: () => null,
	target: authModel.setAuthUser,
});
