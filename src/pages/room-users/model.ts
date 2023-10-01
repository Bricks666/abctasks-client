import { update } from '@farfetched/core';
import { sample } from 'effector';

import { addUsersIntoRoomModel } from '@/features/users';

import { roomsModel } from '@/entities/rooms';
import { usersInRoomModel } from '@/entities/users';

import { routes } from '@/shared/configs';
import { sessionModel } from '@/shared/models';

export const currentRoute = routes.room.users;
export const authorizedRoute = sessionModel.chainAuthorized(currentRoute, {
	otherwise: routes.login.open,
});

sample({
	clock: authorizedRoute.opened,
	fn: ({ params, }) => ({ roomId: params.id, }),
	target: [usersInRoomModel.query.start, roomsModel.query.start],
});

update(usersInRoomModel.query, {
	on: addUsersIntoRoomModel.mutation,
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
					refetch: true,
				};
			}

			return {
				result: [...query.result, mutation.result.data],
			};
		},
	},
});
