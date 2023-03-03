import { createMutation, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { Literal } from 'runtypes';
import { roomsModel } from '@/entities/rooms';
import { membersApi } from '@/shared/api';
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
				result: query.result.filter((room) => room.id !== mutation.params.id),
			};
		},
	},
});
