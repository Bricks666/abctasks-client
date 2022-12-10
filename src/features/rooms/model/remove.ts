import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { Boolean } from 'runtypes';
import { RemoveRoomRequest, roomsApi } from '@/shared/api';
import { createMutationWithAccess } from '@/shared/lib';
import { StandardFailError } from '@/shared/packages';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardSuccessResponse
} from '@/shared/types';

const removeRoomDomain = createDomain();

export const removeRoomFx = removeRoomDomain.effect<
	RemoveRoomRequest,
	StandardResponse<boolean>,
	StandardFailError
>('removeRoomFx');
removeRoomFx.use(roomsApi.remove);

export const removeRoomMutation = createMutationWithAccess<
	RemoveRoomRequest,
	StandardResponse<boolean>,
	StandardSuccessResponse<boolean>,
	StandardFailError
>({
	effect: removeRoomFx,
	contract: runtypeContract(getStandardSuccessResponse(Boolean)),
});
