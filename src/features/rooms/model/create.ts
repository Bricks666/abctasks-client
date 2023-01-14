import { update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { roomsModel } from '@/entities/rooms';
import { CreateRoomParams, room, Room, roomsApi } from '@/shared/api';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import { getStandardResponse, StandardResponse } from '@/shared/types';

const createRoomsDomain = createDomain();

const handlerFx = createRoomsDomain.effect<
	CreateRoomParams,
	StandardResponse<Room>,
	StandardFailError
>(roomsApi.create);

export const mutation = createMutationWithAccess<
	CreateRoomParams,
	StandardResponse<Room>,
	StandardResponse<Room>,
	StandardFailError
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(room)),
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
				result: [...query.result, mutation.result.data],
			};
		},
	},
});
