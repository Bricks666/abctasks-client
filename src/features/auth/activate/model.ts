import { createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createEffect } from 'effector';
import { Boolean } from 'runtypes';

import { authApi, ActivateParams } from '@/shared/api';
import { dataExtractor } from '@/shared/lib';
import { StandardResponse, getStandardResponse } from '@/shared/types';

const handlerFx = createEffect(authApi.activate);
export const query = createQuery<
	ActivateParams,
	StandardResponse<boolean>,
	Error,
	StandardResponse<boolean>,
	globalThis.Boolean
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Boolean)),
	mapData: dataExtractor,
});
