import { update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { Literal } from 'runtypes';
import { tasksInRoomModel } from '@/entities/tasks';
import { RemoveTaskParams, tasksApi } from '@/shared/api';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardResponse
} from '@/shared/types';

const removeTaskDomain = createDomain();

const handlerFx = removeTaskDomain.effect<
	RemoveTaskParams,
	StandardResponse<boolean>,
	StandardFailError
>('removeTaskFx');
handlerFx.use(tasksApi.remove);

export const mutation = createMutationWithAccess<
	RemoveTaskParams,
	StandardResponse<boolean>,
	StandardSuccessResponse<boolean>,
	StandardFailError
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Literal(true))),
});

update(tasksInRoomModel.query, {
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
				result: query.result.filter((task) => task.id !== mutation.params.id),
			};
		},
	},
});
