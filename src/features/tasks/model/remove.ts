import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { Boolean } from 'runtypes';
import { tasksModel } from '@/entities/tasks';
import { getTasksQuery } from '@/entities/tasks/model/tasks';
import { RemoveTaskRequest, tasksApi } from '@/shared/api';
import { createMutationWithAccess } from '@/shared/lib';
import { StandardFailError } from '@/shared/packages';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardSuccessResponse
} from '@/shared/types';

const removeTaskDomain = createDomain();

export const removeTaskFx = removeTaskDomain.effect<
	RemoveTaskRequest,
	StandardResponse<boolean>,
	StandardFailError
>('removeTaskFx');
removeTaskFx.use(tasksApi.remove);

export const removeTaskMutation = createMutationWithAccess<
	RemoveTaskRequest,
	StandardResponse<boolean>,
	StandardSuccessResponse<boolean>,
	StandardFailError
>({
	effect: removeTaskFx,
	contract: runtypeContract(getStandardSuccessResponse(Boolean)),
});

sample({
	clock: removeTaskMutation.finished.success,
	source: tasksModel.getTasksQuery.$data,
	fn: (tasks, { params, result: { data, }, }) => {
		if (!data) {
			return tasks;
		}
		return tasks.filter((task) => task.id !== params.id);
	},
	target: getTasksQuery.$data,
});