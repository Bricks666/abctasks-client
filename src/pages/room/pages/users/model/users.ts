import { update } from '@farfetched/core';

import { addUserRoomModel } from '@/features/rooms';

import { usersInRoomModel } from '@/entities/users';

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
