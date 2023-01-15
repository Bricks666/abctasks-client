import { update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { Literal } from 'runtypes';
import { roomsModel } from '@/entities/rooms';
import { RemoveRoomParams, roomsApi } from '@/shared/api';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import { StandardResponse, getStandardResponse } from '@/shared/types';

const removeRoomDomain = createDomain();

const handlerFx = removeRoomDomain.effect<
	RemoveRoomParams,
	StandardResponse<boolean>,
	StandardFailError
>(roomsApi.remove);

export const mutation = createMutationWithAccess<
	RemoveRoomParams,
	StandardResponse<boolean>,
	StandardResponse<boolean>,
	StandardFailError
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
				result: query.result.filter((room) => room.id !== mutation.params.id),
			};
		},
	},
});
