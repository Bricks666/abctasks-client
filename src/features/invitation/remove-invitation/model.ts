import { createMutation, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createEffect, sample } from 'effector';
import { Boolean } from 'runtypes';

import { invitationsModel } from '@/entities/invitations';

import { invitationsApi } from '@/shared/api';
import { i18n } from '@/shared/configs';
import { notificationsModel } from '@/shared/models';
import { getStandardResponse } from '@/shared/types';

const handlerFx = createEffect(invitationsApi.remove);

export const mutation = createMutation({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Boolean)),
});

update(invitationsModel.query, {
	on: mutation,
	by: {
		success: ({ query, mutation, }) => {
			if (!query) {
				return {
					result: [],
				};
			}

			if ('error' in query) {
				return {
					error: query.error,
				};
			}

			if (!mutation.result.data) {
				return query;
			}

			return {
				result: query.result.filter(
					(invitation) => invitation.id !== mutation.params.id
				),
			};
		},
	},
});

sample({
	clock: mutation.finished.success,
	fn: () => ({
		message: i18n.t('actions.remove_invitation.notifications.success', {
			ns: 'room-invitations',
		}),
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: mutation.finished.failure,
	fn: () => ({
		message: i18n.t('actions.remove_invitation.notifications.error', {
			ns: 'room-invitations',
		}),
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});
