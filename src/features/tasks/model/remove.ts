import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { Boolean } from 'runtypes';
import { taskModel, tasksModel } from '@/entities/tasks';
import { query } from '@/entities/tasks/model/tasks';
import { RemoveTaskRequest, tasksApi } from '@/shared/api';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardSuccessResponse
} from '@/shared/types';

const removeTaskDomain = createDomain();

export const handlerFx = removeTaskDomain.effect<
	RemoveTaskRequest,
	StandardResponse<boolean>,
	StandardFailError
>('removeTaskFx');
handlerFx.use(tasksApi.remove);

export const mutation = createMutationWithAccess<
	RemoveTaskRequest,
	StandardResponse<boolean>,
	StandardSuccessResponse<boolean>,
	StandardFailError
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardSuccessResponse(Boolean)),
});

sample({
	clock: mutation.finished.success,
	source: tasksModel.query.$data,
	fn: (tasks, { params, result: { data, }, }) => {
		if (!data) {
			return tasks;
		}
		return tasks.filter((task) => task.id !== params.id);
	},
	target: query.$data,
});

sample({
	clock: mutation.finished.success,
	target: [tasksModel.invalidateCache, taskModel.invalidateCache],
});
