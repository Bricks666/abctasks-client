import { createMutation } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createEffect, sample } from 'effector';
import { Boolean } from 'runtypes';

import { invitationsApi } from '@/shared/api';
import { i18n } from '@/shared/configs';
import { notificationsModel } from '@/shared/models';
import { getStandardResponse } from '@/shared/types';

const handlerFx = createEffect(invitationsApi.approveInvitation);

export const mutation = createMutation({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Boolean)),
});

sample({
	clock: mutation.finished.success,
	fn: () =>
		({
			message: i18n.t('actions.approve.notifications.success', {
				ns: 'room-invitation',
			}),
			color: 'success',
		} as const),
	target: notificationsModel.create,
});

sample({
	clock: mutation.finished.failure,
	fn: () =>
		({
			message: i18n.t('actions.approve.notifications.error', {
				ns: 'room-invitation',
			}),
			color: 'error',
		} as const),
	target: notificationsModel.create,
});
