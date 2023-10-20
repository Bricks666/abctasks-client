import { createMutation, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { Literal } from 'runtypes';

import { roomsModel } from '@/entities/rooms';

import { roomsApi } from '@/shared/api';
import { i18nModel, notificationsModel } from '@/shared/models';
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

export const mutation = createMutation<
	InRoomParams,
	StandardResponse<boolean>,
	StandardResponse<boolean>,
	Error
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Literal(true))),
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
	source: i18nModel.integration.$t,
	fn: (t) => ({
		message: t('notifications.success', { ns: 'remove-room', }),
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: mutation.finished.failure,
	source: i18nModel.integration.$t,
	fn: (t) => ({
		message: t('notifications.error', { ns: 'remove-room', }),
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});
