import { createMutation, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { createPopupControlModel } from '@/entities/popups';
import { tasksInRoomModel } from '@/entities/tasks';
import { CreateTaskParams, Task, tasksApi, task } from '@/shared/api';
import { popupsMap, routes } from '@/shared/configs';
import { StandardResponse, getStandardResponse } from '@/shared/types';
import { form } from './form';

const createTaskDomain = createDomain();

const handlerFx = createTaskDomain.effect<
	CreateTaskParams,
	StandardResponse<Task>,
	Error
>(tasksApi.create);

export const mutation = createMutation<
	CreateTaskParams,
	StandardResponse<Task>,
	StandardResponse<Task>,
	Error
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(task)),
});

export const { close, $isOpen, } = createPopupControlModel(popupsMap.createTask);

const { reset, formValidated, } = form;

sample({
	clock: close,
	target: tasksInRoomModel.$status.reinit!,
});

sample({
	clock: close,
	target: reset,
});

sample({
	clock: mutation.finished.success,
	target: close,
});

sample({
	clock: formValidated,
	source: routes.room.tasks.$params,
	filter: $isOpen,
	fn: ({ id, }, values) => ({ roomId: id, ...values, }),
	target: mutation.start,
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
				result: [...query.result, mutation.result.data],
			};
		},
	},
});
