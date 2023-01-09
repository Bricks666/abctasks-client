import { update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { usersInRoomModel } from '@/entities/rooms';
import { AddUserRoomParams, roomsApi, user, User } from '@/shared/api';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import { StandardResponse, getStandardResponse } from '@/shared/types';

const addUserRoomDomain = createDomain();

const handlerFx = addUserRoomDomain.effect<
	AddUserRoomParams,
	StandardResponse<User>,
	StandardFailError
>();

handlerFx.use(roomsApi.addUser);

export const mutation = createMutationWithAccess({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(user)),
});

update(usersInRoomModel.query, {
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
