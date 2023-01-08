import { update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { Literal } from 'runtypes';
import { /* roomModel,  */ roomsModel } from '@/entities/rooms';
import { ExitRoomRequest, roomsApi } from '@/shared/api';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import { StandardResponse, getStandardSuccessResponse } from '@/shared/types';

const exitRoomDomain = createDomain();

const handlerFx = exitRoomDomain.effect<
	ExitRoomRequest,
	StandardResponse<boolean>,
	StandardFailError
>();

handlerFx.use(roomsApi.exit);

export const mutation = createMutationWithAccess({
	effect: handlerFx,
	contract: runtypeContract(getStandardSuccessResponse(Literal(true))),
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
