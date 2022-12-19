import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { roomsModel } from '@/entities/rooms';
import { UpdateRoomRequest, Room, roomsApi, room } from '@/shared/api';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardSuccessResponse
} from '@/shared/types';

const updateRoomDomain = createDomain();

export const handlerFx = updateRoomDomain.effect<
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

sample({
	clock: mutation.finished.success,
	fn: ({ result, }) => result.data,
	target: roomsModel.update,
});
