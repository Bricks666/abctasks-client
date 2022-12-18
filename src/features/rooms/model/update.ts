import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { UpdateRoomRequest, Room, roomsApi, room } from '@/shared/api';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardSuccessResponse
} from '@/shared/types';

const updateRoomDomain = createDomain();

export const updateRoomFx = updateRoomDomain.effect<
	UpdateRoomRequest,
	StandardResponse<Room>,
	StandardFailError
>('updateRoomFx');
updateRoomFx.use(roomsApi.update);

export const updateRoomMutation = createMutationWithAccess<
	UpdateRoomRequest,
	StandardResponse<Room>,
	StandardSuccessResponse<Room>,
	StandardFailError
>({
	effect: updateRoomFx,
	contract: runtypeContract(getStandardSuccessResponse(room)),
});
