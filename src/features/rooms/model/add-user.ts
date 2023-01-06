import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { AddUserRoomRequest, roomsApi, user, User } from '@/shared/api';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import { StandardResponse, getStandardSuccessResponse } from '@/shared/types';

const addUserRoomDomain = createDomain();

const handlerFx = addUserRoomDomain.effect<
	AddUserRoomRequest,
	StandardResponse<User>,
	StandardFailError
>();

handlerFx.use(roomsApi.addUser);

export const mutation = createMutationWithAccess({
	effect: handlerFx,
	contract: runtypeContract(getStandardSuccessResponse(user)),
});
