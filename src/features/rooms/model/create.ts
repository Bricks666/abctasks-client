import { update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { roomsModel } from '@/entities/rooms';
import { CreateRoomRequest, room, Room, roomsApi } from '@/shared/api';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import {
	getStandardSuccessResponse,
	StandardResponse,
	StandardSuccessResponse
} from '@/shared/types';

const createRoomsDomain = createDomain();

const handlerFx = createRoomsDomain.effect<
	CreateRoomRequest,
	StandardResponse<Room>,
	StandardFailError
>('createRoomFx');
handlerFx.use(roomsApi.create);

export const mutation = createMutationWithAccess<
	CreateRoomRequest,
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
				result: [...query.result, mutation.result.data],
			};
		},
	},
});
