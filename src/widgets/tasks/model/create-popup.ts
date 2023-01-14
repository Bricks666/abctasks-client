import { createDomain, sample } from 'effector';
import { createTaskModel } from '@/features/tasks';
import { popupsModel } from '@/entities/popups';
import { tasksModel } from '@/entities/tasks';
import { popupsMap } from '@/shared/configs';

const createTaskPopupDomain = createDomain();

export const close = createTaskPopupDomain.event();

sample({
	clock: close,
	fn: () => popupsMap.createTask,
	target: popupsModel.close,
});

sample({
	clock: close,
	target: [tasksModel.$id.reinit!, tasksModel.$status.reinit!],
});

sample({
	clock: createTaskModel.mutation.finished.success,
	target: close,
});
