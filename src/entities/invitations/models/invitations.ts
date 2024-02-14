import { cache, createQuery, keepFresh } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createEffect } from 'effector';
import { interval } from 'patronum';
import { Array } from 'runtypes';

import { invitation, invitationsApi } from '@/shared/api';
import { getStandardResponse } from '@/shared/types';

const handlerFx = createEffect(invitationsApi.getAll);

export const query = createQuery({
	initialData: [],
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Array(invitation))),
	mapData: ({ result, }) => result.data,
});

cache(query);

keepFresh(query, {
	triggers: [interval({ timeout: 5000, })],
});
