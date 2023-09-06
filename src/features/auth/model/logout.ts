import { createMutation } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { Literal } from 'runtypes';

import { authModel } from '@/entities/auth';

import { authApi } from '@/shared/api';
import { StandardResponse, getStandardResponse } from '@/shared/types';

const logoutDomain = createDomain();

export const logoutFx = logoutDomain.effect<void, StandardResponse<boolean>>(
	authApi.logout
);

export const logoutMutation = createMutation<
	void,
	StandardResponse<boolean>,
	StandardResponse<boolean>,
	Error
>({
	effect: logoutFx,
	contract: runtypeContract(getStandardResponse(Literal(true))),
});

sample({
	clock: logoutMutation.finished.success,
	filter: ({ result, }) => globalThis.Boolean(result.data),
	fn: () => null,
	target: authModel.setUser,
});
