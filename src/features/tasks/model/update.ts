import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { getTasksQuery } from '@/entities/tasks/model/tasks';
import { UpdateTaskRequest, Task, tasksApi, task } from '@/shared/api';
import { createMutationWithAccess } from '@/shared/lib';
import { StandardFailError } from '@/shared/packages';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardSuccessResponse
} from '@/shared/types';

const updateTaskDomain = createDomain();

export const updateTaskFx = updateTaskDomain.effect<
	UpdateTaskRequest,
	StandardResponse<Task>,
	StandardFailError
>('updateTaskFx');
updateTaskFx.use(tasksApi.update);

export const updateTaskMutation = createMutationWithAccess<
	UpdateTaskRequest,
	StandardResponse<Task>,
	StandardSuccessResponse<Task>,
	StandardFailError
>({
	effect: updateTaskFx,
	contract: runtypeContract(getStandardSuccessResponse(task)),
});

sample({
	clock: updateTaskMutation.finished.success,
	source: getTasksQuery.$data,
	fn: (tasks, { result: { data, }, }) => {
		return tasks.map((task) => (task.id === data.id ? data : task));
	},
	target: getTasksQuery.$data,
});
