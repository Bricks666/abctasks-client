import { update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { roomsModel } from '@/entities/rooms';
import { UpdateRoomParams, Room, roomsApi, room } from '@/shared/api';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardResponse
} from '@/shared/types';

const updateRoomDomain = createDomain();

const handlerFx = updateRoomDomain.effect<
	UpdateRoomParams,
	StandardResponse<Room>,
	StandardFailError
>('updateRoomFx');
handlerFx.use(roomsApi.update);

export const mutation = createMutationWithAccess<
	UpdateRoomParams,
	StandardResponse<Room>,
	StandardSuccessResponse<Room>,
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
				result: query.result.map((room) =>
					room.id === mutation.result.data.id ? mutation.result.data : room
				),
			};
		},
	},
});
