import { createDomain, sample } from 'effector';
import { updateTaskModel } from '@/features/tasks';
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
	target: tasksModel.$id.reinit!,
});

sample({
	clock: updateTaskModel.mutation.finished.success,
	target: close,
});
