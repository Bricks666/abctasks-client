import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { CreateRoomRequest, room, Room, roomsApi } from '@/shared/api';
import { createMutationWithAccess } from '@/shared/lib';
import { StandardFailError } from '@/shared/packages';
import {
	getStandardSuccessResponse,
	StandardResponse,
	StandardSuccessResponse
} from '@/shared/types';

const createRoomsDomain = createDomain();

export const createRoomFx = createRoomsDomain.effect<
	CreateRoomRequest,
	StandardResponse<Room>,
	StandardFailError
>('createRoomFx');
createRoomFx.use(roomsApi.create);

export const createRoomMutation = createMutationWithAccess<
	CreateRoomRequest,
	StandardResponse<Room>,
	StandardSuccessResponse<Room>,
	StandardFailError
>({
	effect: createRoomFx,
	contract: runtypeContract(getStandardSuccessResponse(room)),
});
