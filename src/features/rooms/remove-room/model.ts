import { createMutation, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, createEvent, createStore, sample } from 'effector';
import { Literal } from 'runtypes';

import { roomsModel } from '@/entities/rooms';

import { roomsApi } from '@/shared/api';
import { i18n, popupsMap } from '@/shared/configs';
import { createPopupControlModel } from '@/shared/lib';
import { notificationsModel } from '@/shared/models';
import {
	StandardResponse,
	getStandardResponse,
	InRoomParams
} from '@/shared/types';

const removeRoomDomain = createDomain();

const handlerFx = removeRoomDomain.effect<
	InRoomParams,
	StandardResponse<boolean>,
	Error
>(roomsApi.remove);

const $id = createStore<number | null>(null);

export const popupControls = createPopupControlModel({
	name: popupsMap.removeRoom,
	sync: false,
});

export const openConfirm = createEvent<number>();
export const remove = createEvent();

export const mutation = createMutation<
	InRoomParams,
	StandardResponse<boolean>,
	StandardResponse<boolean>,
	Error
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Literal(true))),
});

sample({
	clock: openConfirm,
	target: [$id, popupControls.open],
});

sample({
	clock: remove,
	source: {
		id: $id,
	},
	filter: ({ id, }) => !!id,
	fn: ({ id, }) => {
		return {
			roomId: id,
		} as InRoomParams;
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

update(roomsModel.query, {
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
				result: query.result.filter(
					(room) => room.id !== mutation.params.roomId
				),
			};
		},
	},
});

sample({
	clock: mutation.finished.success,
	fn: () => ({
		message: i18n.t('actions.remove_room.notifications.success', {
			ns: 'rooms',
		}),
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: mutation.finished.failure,
	fn: () => ({
		message: i18n.t('actions.remove_room.notifications.error', {
			ns: 'rooms',
		}),
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});
