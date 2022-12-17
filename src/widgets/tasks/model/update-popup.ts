import { createDomain, sample } from 'effector';
import { popupsModel } from '@/entities/popups';
import { tasksModel } from '@/entities/tasks';
import { popups } from '@/shared/configs';

const updateTaskPopupDomain = createDomain();

export const close = updateTaskPopupDomain.event();

sample({
	clock: close,
	fn: () => popups.updateTask,
	target: popupsModel.close,
});

sample({
	clock: close,
	target: tasksModel.$selectedTaskId.reinit!,
});
