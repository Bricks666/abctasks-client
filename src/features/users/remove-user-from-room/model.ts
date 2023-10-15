import { createMutation, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createEffect } from 'effector';
import { Boolean } from 'runtypes';

import { usersInRoomModel } from '@/entities/users';

import { membersApi } from '@/shared/api';
import { getStandardResponse } from '@/shared/types';

const handlerFx = createEffect(membersApi.remove);

export const mutation = createMutation({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Boolean)),
});

update(usersInRoomModel.query, {
	on: mutation,
	by: {
		success: ({ mutation, query, }) => {
			if (!query) {
				return {
					result: [],
					refetch: true,
				};
			}

			if ('error' in query) {
				return {
					error: query.error,
					refetch: true,
				};
			}

			return {
				result: query.result.filter(
					(user) => user.id !== mutation.params.userId
				),
			};
		},
	},
});