import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { tasksModel } from '@/entities/tasks';
import { getTasksQuery } from '@/entities/tasks/model/tasks';
import { CreateTaskRequest, Task, tasksApi, task } from '@/shared/api';
import { createMutationWithAccess } from '@/shared/lib';
import { StandardFailError } from '@/shared/packages';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardSuccessResponse
} from '@/shared/types';

const createTaskDomain = createDomain();

export const createTaskFx = createTaskDomain.effect<
	CreateTaskRequest,
	StandardResponse<Task>,
	StandardFailError
>('createTaskFx');
createTaskFx.use(tasksApi.create);

export const createTaskMutation = createMutationWithAccess<
	CreateTaskRequest,
	StandardResponse<Task>,
	StandardSuccessResponse<Task>,
	StandardFailError
>({
	effect: createTaskFx,
	contract: runtypeContract(getStandardSuccessResponse(task)),
});

sample({
	clock: createTaskMutation.finished.success,
	source: tasksModel.getTasksQuery.$data,
	fn: (tasks, { result: { data, }, }) => {
		return [...tasks, data];
	},
	target: getTasksQuery.$data,
});
