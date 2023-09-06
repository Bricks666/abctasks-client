import { createMutation, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { and } from 'patronum';

import { createPopupControlModel } from '@/entities/popups';
import { roomModel, roomsModel } from '@/entities/rooms';

import { UpdateRoomParams, Room, roomsApi, room } from '@/shared/api';
import { popupsMap } from '@/shared/configs';
import { StandardResponse, getStandardResponse } from '@/shared/types';

import { form } from './form';

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

export const { close, $isOpen, } = createPopupControlModel(popupsMap.updateRoom);

const { formValidated, reset, setForm, fields, } = form;

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
	target: setForm,
});

sample({
	clock: roomModel.query.finished.success,
	fn: () => false,
	target: [fields.description.$isDirty, fields.name.$isDirty],
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
