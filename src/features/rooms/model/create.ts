import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { roomsModel } from '@/entities/rooms';
import { CreateRoomRequest, room, Room, roomsApi } from '@/shared/api';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import {
	getStandardSuccessResponse,
	StandardResponse,
	StandardSuccessResponse
} from '@/shared/types';

const createRoomsDomain = createDomain();

export const handlerFx = createRoomsDomain.effect<
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

sample({
	clock: mutation.finished.success,
	fn: ({ result, }) => result.data,
	target: roomsModel.add,
});
