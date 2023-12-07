import { cache, createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { combine, createEffect, sample } from 'effector';

import { invitation, invitationsApi } from '@/shared/api';
import { i18n } from '@/shared/configs';
import { notificationsModel } from '@/shared/models';
import { getStandardResponse } from '@/shared/types';

const handlerFx = createEffect(invitationsApi.getViaToken);

export const query = createQuery({
	initialData: null,
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(invitation)),
	mapData: ({ result, }) => result.data,
});

export const $loaded = combine(query.$data, (data) => {
	return !!data;
});

sample({
	clock: query.finished.failure,
	fn: () =>
		({
			message: i18n.t('actions.via-token.notifications.error', {
				ns: 'room-invitation',
			}),
			color: 'error',
		} as const),
	target: notificationsModel.create,
});

cache(query);
