import { cache, createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createEffect } from 'effector';

import { invitation, invitationsApi } from '@/shared/api';
import { getStandardResponse } from '@/shared/types';

const handlerFx = createEffect(invitationsApi.getViaToken);

export const query = createQuery({
	initialData: null,
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(invitation)),
	mapData: ({ result, }) => result.data,
});

cache(query);
