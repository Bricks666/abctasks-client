import { createMutation, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';

import { createPopupControlModel } from '@/entities/popups';
import { roomsModel } from '@/entities/rooms';

import { CreateRoomParams, room, Room, roomsApi } from '@/shared/api';
import { i18n, popupsMap } from '@/shared/configs';
import { notificationsModel } from '@/shared/models';
import { getStandardResponse, StandardResponse } from '@/shared/types';

import { roomFormModel } from '../form';

const createRoomsDomain = createDomain();

const handlerFx = createRoomsDomain.effect(roomsApi.create);

export const mutation = createMutation<
	CreateRoomParams,
	StandardResponse<Room>,
	StandardResponse<Room>,
	Error
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(room)),
});

export const form = roomFormModel.create();

export const { close, $isOpen, } = createPopupControlModel(popupsMap.createRoom);
const { reset, formValidated, } = form;

sample({
	clock: close,
	target: reset,
});

sample({
	clock: mutation.finished.success,
	target: close,
});

sample({
	clock: formValidated,
	filter: $isOpen,
	target: mutation.start,
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
				result: [...query.result, mutation.result.data],
			};
		},
	},
});

sample({
	clock: mutation.finished.success,
	fn: () => ({
		message: i18n.t('actions.create_room.notifications.success', {
			ns: 'rooms',
		}),
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: mutation.finished.failure,
	fn: () => ({
		message: i18n.t('actions.create_room.notifications.error', { ns: 'rooms', }),
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});
