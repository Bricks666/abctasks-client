import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { taskModel, tasksModel } from '@/entities/tasks';
import { UpdateTaskRequest, Task, tasksApi, task } from '@/shared/api';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardSuccessResponse
} from '@/shared/types';

const updateTaskDomain = createDomain();

export const handlerFx = updateTaskDomain.effect<
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

sample({
	clock: mutation.finished.success,
	source: tasksModel.query.$data,
	fn: (tasks, { result: { data, }, }) => {
		return tasks.map((task) => (task.id === data.id ? data : task));
	},
	target: tasksModel.query.$data,
});

sample({
	clock: mutation.finished.success,
	target: [
		tasksModel.invalidateCache,
		taskModel.invalidateCache,
		taskModel.reset
	],
});
