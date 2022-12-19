import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { tasksModel } from '@/entities/tasks';
import { CreateTaskRequest, Task, tasksApi, task } from '@/shared/api';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardSuccessResponse
} from '@/shared/types';

const createTaskDomain = createDomain();

export const handlerFx = createTaskDomain.effect<
	CreateTaskRequest,
	StandardResponse<Task>,
	StandardFailError
>('createTaskFx');
handlerFx.use(tasksApi.create);

export const mutation = createMutationWithAccess<
	CreateTaskRequest,
	StandardResponse<Task>,
	StandardSuccessResponse<Task>,
	StandardFailError
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardSuccessResponse(task)),
});

sample({
	clock: mutation.finished.success,
	fn: ({ result, }) => result.data,
	target: tasksModel.add,
});
