import { update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { Literal } from 'runtypes';
import { /* roomModel,  */ roomsModel } from '@/entities/rooms';
import { ExitRoomParams, roomsApi } from '@/shared/api';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import { StandardResponse, getStandardResponse } from '@/shared/types';

const exitRoomDomain = createDomain();

const handlerFx = exitRoomDomain.effect<
	ExitRoomParams,
	StandardResponse<boolean>,
	StandardFailError
>(roomsApi.exit);

export const mutation = createMutationWithAccess({
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

/*
TODO: Сделать обновление и кеширование
*/
// update(roomModel.query)
