import { createMutation, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createEffect, sample } from 'effector';
import { createForm } from 'effector-forms';

import { invitationsModel } from '@/entities/invitations';

import { invitation, invitationsApi, User } from '@/shared/api';
import { i18n, routes } from '@/shared/configs';
import { notificationsModel } from '@/shared/models';
import { getStandardResponse } from '@/shared/types';

const handlerFx = createEffect(invitationsApi.invite);

export const mutation = createMutation({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(invitation)),
});

interface AddUserFormValues {
	readonly user: User | null;
}

export const form = createForm<AddUserFormValues>({
	fields: {
		user: {
			init: null,
		},
	},
});

sample({
	clock: form.formValidated,
	source: routes.room.users.$params,
	filter: (_, values) => Boolean(values.user),
	fn: (params, values) => ({ userId: values.user!.id, roomId: params.id, }),
	target: mutation.start,
});

sample({
	clock: mutation.finished.success,
	fn: () => ({
		message: i18n.t('actions.invite_user.notifications.success', {
			ns: 'room-users',
		}),
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: mutation.finished.failure,
	fn: () => ({
		message: i18n.t('actions.invite_user.notifications.error', {
			ns: 'room-users',
		}),
		color: 'error' as const,
	}),
	target: notificationsModel.create,
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

			return {
				result: [...query.result, mutation.result.data],
			};
		},
	},
});
