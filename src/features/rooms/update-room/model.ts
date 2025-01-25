import { createMutation, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, createEvent, sample } from 'effector';
import { and, not } from 'patronum';

import { roomModel, roomsModel } from '@/entities/rooms';

import { UpdateRoomParams, RoomDto, roomsApi, room } from '@/shared/api';
import { SEARCH_PARAMS_NAMES, i18n, POPUPS_NAMES } from '@/shared/configs';
import { createPopupControlModel, createQueryModel } from '@/shared/lib';
import { notificationsModel } from '@/shared/models';
import { StandardResponse, getStandardResponse } from '@/shared/types';

import { roomFormModel } from '../form';

const updateRoomDomain = createDomain();

const handlerFx = updateRoomDomain.effect<
	UpdateRoomParams,
	StandardResponse<RoomDto>,
	Error
>(roomsApi.update);

export const mutation = createMutation<
	UpdateRoomParams,
	StandardResponse<RoomDto>,
	StandardResponse<RoomDto>,
	Error
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(room)),
});

export const form = roomFormModel.create();
export const popupControls = createPopupControlModel({
	name: POPUPS_NAMES.updateRoom,
});
export const roomId = createQueryModel<number | null>({
	name: SEARCH_PARAMS_NAMES.roomId,
	defaultValue: null,
});
export const openPopup = createEvent<number>();

const { formValidated, reset, setForm, } = form;

sample({
	clock: openPopup,
	target: [popupControls.open, roomId.set],
});

sample({
	clock: popupControls.opened,
	source: roomId.$value,
	filter: Boolean,
	fn: (id) => ({ roomId: id, }),
	target: roomModel.query.start,
});

sample({
	clock: popupControls.closed,
	target: [roomId.reset, reset, roomModel.query.reset],
});

sample({
	clock: mutation.finished.success,
	target: popupControls.close,
});

sample({
	clock: formValidated,
	source: roomId.$value,
	filter: and(popupControls.$isOpen, not(roomId.$isEmpty)),
	fn: (roomId, values) => {
		return { ...values, roomId: Number(roomId), };
	},
	target: mutation.start,
});

sample({
	clock: roomModel.query.finished.success,
	fn: ({ result, }) => result,
	target: setForm,
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
	fn: () => ({
		message: i18n.t('actions.update_room.notifications.success', {
			ns: 'rooms',
		}),
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: mutation.finished.failure,
	fn: () => ({
		message: i18n.t('actions.update_room.notifications.error', { ns: 'rooms', }),
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});
