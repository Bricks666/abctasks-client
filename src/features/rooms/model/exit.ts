import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { Boolean } from 'runtypes';
import { roomsModel } from '@/entities/rooms';
import { ExitRoomRequest, roomsApi } from '@/shared/api';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import { StandardResponse, getStandardSuccessResponse } from '@/shared/types';

const exitRoomDomain = createDomain();

const handlerFx = exitRoomDomain.effect<
	ExitRoomRequest,
	StandardResponse<boolean>,
	StandardFailError
>();

handlerFx.use(roomsApi.exit);

export const mutation = createMutationWithAccess({
	effect: handlerFx,
	contract: runtypeContract(getStandardSuccessResponse(Boolean)),
});

sample({
	clock: mutation.finished.success,
	filter: ({ result, }) => result.data,
	fn: ({ params, }) => params,
	target: roomsModel.remove,
});
