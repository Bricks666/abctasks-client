import { createMutation } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { Literal } from 'runtypes';

import { authApi } from '@/shared/api';
import { sessionModel } from '@/shared/models';
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
	target: sessionModel.query.start,
});
