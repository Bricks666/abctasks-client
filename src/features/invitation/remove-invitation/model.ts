import { createMutation, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { Boolean } from 'runtypes';

import { invitationsModel } from '@/entities/invitations';

import { RemoveInvitationRequestParams, invitationsApi } from '@/shared/api';
import { i18n, popupsMap, routes } from '@/shared/configs';
import { createPopupControlModel } from '@/shared/lib';
import { notificationsModel } from '@/shared/models';
import { getStandardResponse } from '@/shared/types';

const handlerFx = createEffect(invitationsApi.remove);

const $id = createStore<number | null>(null);

export const openConfirm = createEvent<number>();
export const remove = createEvent();

export const popupControls = createPopupControlModel({
	name: popupsMap.removeInvitation,
	sync: false,
});

export const mutation = createMutation({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Boolean)),
});

sample({
	clock: openConfirm,
	target: [$id, popupControls.open],
});

sample({
	clock: remove,
	source: {
		id: $id,
		roomId: routes.room.users.$params.map((params) => params.id),
	},
	filter: ({ id, roomId, }) => !!id && !!roomId,
	fn: ({ roomId, id, }) => {
		return {
			roomId,
			id,
		} as RemoveInvitationRequestParams;
	},
	target: mutation.start,
});

sample({
	clock: popupControls.closed,
	target: $id.reinit!,
});

sample({
	clock: mutation.finished.finally,
	target: popupControls.close,
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
