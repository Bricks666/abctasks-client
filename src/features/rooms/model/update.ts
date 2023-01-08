import { update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { roomsModel } from '@/entities/rooms';
import { UpdateRoomRequest, Room, roomsApi, room } from '@/shared/api';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardSuccessResponse
} from '@/shared/types';

const updateRoomDomain = createDomain();

const handlerFx = updateRoomDomain.effect<
	UpdateRoomRequest,
	StandardResponse<Room>,
	StandardFailError
>('updateRoomFx');
handlerFx.use(roomsApi.update);

export const mutation = createMutationWithAccess<
	UpdateRoomRequest,
	StandardResponse<Room>,
	StandardSuccessResponse<Room>,
	StandardFailError
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardSuccessResponse(room)),
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
