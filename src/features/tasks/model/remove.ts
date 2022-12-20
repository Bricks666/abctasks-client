import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { Boolean } from 'runtypes';
import { tasksModel } from '@/entities/tasks';
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
	filter: ({ result, }) => result.data,
	fn: ({ params, }) => params,
	target: tasksModel.remove,
});
