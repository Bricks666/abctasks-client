import { createMutation, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createEffect, createEvent, createStore, sample } from 'effector';
import { Boolean } from 'runtypes';

import { usersInRoomModel } from '@/entities/users';

import { RemoveUserParams, membersApi } from '@/shared/api';
import { i18n, popupsMap, routes } from '@/shared/configs';
import { createPopupControlModel } from '@/shared/lib';
import { notificationsModel } from '@/shared/models';
import { getStandardResponse } from '@/shared/types';

const handlerFx = createEffect(membersApi.remove);

export const popupControls = createPopupControlModel({
	name: popupsMap.removeUserFromRoom,
	sync: false,
});

const $id = createStore<number | null>(null);

export const openConfirm = createEvent<number>();
export const remove = createEvent();

export const mutation = createMutation({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Boolean)),
});

sample({
	clock: openConfirm,
	target: [popupControls.open, $id],
});

sample({
	clock: remove,
	source: {
		id: $id,
		roomId: routes.room.users.$params.map((params) => params.id),
	},
	filter: ({ id, roomId, }) => !!id && !!roomId,
	fn: ({ id, roomId, }) => {
		return {
			roomId,
			userId: id,
		} as RemoveUserParams;
	},
	target: mutation.start,
});

sample({
	clock: mutation.finished.finally,
	target: popupControls.close,
});

sample({
	clock: popupControls.closed,
	target: $id.reinit!,
});

update(usersInRoomModel.query, {
	on: mutation,
	by: {
		success: ({ mutation, query, }) => {
			if (!query) {
				return {
					result: [],
					refetch: true,
				};
			}

			if ('error' in query) {
				return {
					error: query.error,
					refetch: true,
				};
			}

			return {
				result: query.result.filter(
					(user) => user.id !== mutation.params.userId
				),
			};
		},
	},
});

sample({
	clock: mutation.finished.success,
	fn: () => ({
		message: i18n.t('actions.remove_user.notifications.success', {
			ns: 'room-users',
		}),
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: mutation.finished.failure,
	fn: () => ({
		message: i18n.t('actions.remove_user.notifications.error', {
			ns: 'room-users',
		}),
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});
