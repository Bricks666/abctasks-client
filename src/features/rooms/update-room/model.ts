import { createMutation, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { and } from 'patronum';

import { createPopupControlModel } from '@/entities/popups';
import { roomModel, roomsModel } from '@/entities/rooms';

import { UpdateRoomParams, Room, roomsApi, room } from '@/shared/api';
import { popupsMap } from '@/shared/configs';
import { i18nModel, notificationsModel } from '@/shared/models';
import { StandardResponse, getStandardResponse } from '@/shared/types';

import { roomFormModel } from '../form';

const updateRoomDomain = createDomain();

const handlerFx = updateRoomDomain.effect<
	UpdateRoomParams,
	StandardResponse<Room>,
	Error
>(roomsApi.update);

export const mutation = createMutation<
	UpdateRoomParams,
	StandardResponse<Room>,
	StandardResponse<Room>,
	Error
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(room)),
});

export const form = roomFormModel.create();

export const { close, $isOpen, } = createPopupControlModel(popupsMap.updateRoom);

const { formValidated, reset, setInitialForm, } = form;

sample({
	clock: close,
	target: roomsModel.$id.reinit!,
});

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
	source: roomsModel.$id,
	filter: and($isOpen, roomsModel.$id),
	fn: (roomId, values) => {
		return { ...values, roomId: Number(roomId), };
	},
	target: mutation.start,
});

sample({
	clock: roomModel.query.finished.success,
	fn: ({ result, }) => result,
	target: setInitialForm,
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
				result: query.result.map((room) =>
					room.id === mutation.result.data.id ? mutation.result.data : room
				),
			};
		},
	},
});

sample({
	clock: mutation.finished.success,
	source: i18nModel.integration.$t,
	fn: (t) => ({
		message: t('actions.update_room.notifications.success', { ns: 'rooms', }),
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: mutation.finished.failure,
	source: i18nModel.integration.$t,
	fn: (t) => ({
		message: t('actions.update_room.notifications.error', { ns: 'rooms', }),
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});
