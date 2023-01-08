import { update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { tasksModel } from '@/entities/tasks';
import { UpdateTaskRequest, Task, tasksApi, task } from '@/shared/api';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardSuccessResponse
} from '@/shared/types';

const updateTaskDomain = createDomain();

const handlerFx = updateTaskDomain.effect<
	UpdateTaskRequest,
	StandardResponse<Task>,
	StandardFailError
>('updateTaskFx');
handlerFx.use(tasksApi.update);

export const mutation = createMutationWithAccess<
	UpdateTaskRequest,
	StandardResponse<Task>,
	StandardSuccessResponse<Task>,
	StandardFailError
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardSuccessResponse(task)),
});

update(tasksModel.query, {
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

			console.log('[MUTATION]', mutation);
			console.log('[QUERY]', query);

			return {
				result: query.result.map((task) =>
					task.id === mutation.result.data.id ? mutation.result.data : task
				),
			};
		},
	},
});

tasksModel.query.$data.watch(console.log);
