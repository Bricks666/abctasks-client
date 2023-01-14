import { sample } from 'effector';
import { createTaskModel, taskFormModel } from '@/features/tasks';
import { createPopupControlModel } from '@/entities/popups';
import { tasksModel } from '@/entities/tasks';
import { popupsMap, routes } from '@/shared/configs';

export const { close, $isOpen, } = createPopupControlModel(popupsMap.createTask);

sample({
	clock: close,
	target: tasksModel.$status.reinit!,
});

sample({
	clock: close,
	target: taskFormModel.form.reset,
});

sample({
	clock: createTaskModel.mutation.finished.success,
	target: close,
});

sample({
	clock: taskFormModel.form.formValidated,
	source: routes.room.tasks.$params,
	filter: $isOpen,
	fn: ({ id, }, values) => ({ roomId: id, ...values, }),
	target: createTaskModel.mutation.start,
});
