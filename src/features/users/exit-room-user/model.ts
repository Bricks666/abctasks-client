import { createMutation, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { redirect } from 'atomic-router';
import { createDomain, sample } from 'effector';
import { Literal } from 'runtypes';

import { roomsModel } from '@/entities/rooms';

import { membersApi } from '@/shared/api';
import { i18n, routes } from '@/shared/configs';
import { notificationsModel } from '@/shared/models';
import {
	StandardResponse,
	getStandardResponse,
	InRoomParams
} from '@/shared/types';

const exitRoomDomain = createDomain();

const handlerFx = exitRoomDomain.effect<
	InRoomParams,
	StandardResponse<boolean>,
	Error
>(membersApi.exit);

export const mutation = createMutation({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Literal(true))),
});

redirect({
	clock: mutation.finished.success,
	route: routes.rooms,
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
		message: i18n.t('action.exit_room.notifications.success', { ns: 'rooms', }),
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: mutation.finished.failure,
	fn: () => ({
		message: i18n.t('action.exit_room.notifications.error', { ns: 'rooms', }),
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});
