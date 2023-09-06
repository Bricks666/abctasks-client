import { update } from '@farfetched/core';
import { sample } from 'effector';

import { addUserRoomModel } from '@/features/rooms';

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
	target: usersInRoomModel.query.start,
});

/**
 * @todo up usersInRoom model into page model, it it's not used in others layers
 */
update(usersInRoomModel.query, {
	on: addUserRoomModel.mutation,
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
