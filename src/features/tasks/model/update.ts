import { update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { tasksInRoomModel } from '@/entities/tasks';
import { UpdateTaskParams, Task, tasksApi, task } from '@/shared/api';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardResponse
} from '@/shared/types';

const updateTaskDomain = createDomain();

const handlerFx = updateTaskDomain.effect<
	UpdateTaskParams,
	StandardResponse<Task>,
	StandardFailError
>();
handlerFx.use(tasksApi.update);

export const mutation = createMutationWithAccess<
	UpdateTaskParams,
	StandardResponse<Task>,
	StandardSuccessResponse<Task>,
	StandardFailError
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(task)),
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
				result: query.result.map((task) =>
					task.id === mutation.result.data.id ? mutation.result.data : task
				),
			};
		},
	},
});
