import { createMutation, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { Literal } from 'runtypes';

import { roomsModel } from '@/entities/rooms';

import { roomsApi } from '@/shared/api';
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
