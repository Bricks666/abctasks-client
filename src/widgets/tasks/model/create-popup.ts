import { createDomain, sample } from 'effector';
import { popupsModel } from '@/entities/popups';
import { tasksModel } from '@/entities/tasks';
import { popups } from '@/shared/configs';

const createTaskPopupDomain = createDomain();

export const close = createTaskPopupDomain.event();

sample({
	clock: close,
	fn: () => popups.createTask,
	target: popupsModel.close,
});

sample({
	clock: close,
	target: [
		tasksModel.$selectedTaskId.reinit!,
		tasksModel.$selectedStatus.reinit!
	],
});
