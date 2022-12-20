import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { Boolean } from 'runtypes';
import { roomsModel } from '@/entities/rooms';
import { RemoveRoomRequest, roomsApi } from '@/shared/api';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardSuccessResponse
} from '@/shared/types';

const removeRoomDomain = createDomain();

export const handlerFx = removeRoomDomain.effect<
	RemoveRoomRequest,
	StandardResponse<boolean>,
	StandardFailError
>('removeRoomFx');
handlerFx.use(roomsApi.remove);

export const mutation = createMutationWithAccess<
	RemoveRoomRequest,
	StandardResponse<boolean>,
	StandardSuccessResponse<boolean>,
	StandardFailError
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardSuccessResponse(Boolean)),
});

sample({
	clock: mutation.finished.success,
	filter: ({ result, }) => result.data,
	fn: ({ params, }) => {
		return params;
	},
	target: roomsModel.remove,
});
