import { createDomain, sample } from 'effector';
import { popups } from '@/shared/const';
import { removePopup } from '@/shared/models/routes';

const updateTaskPopupDomain = createDomain();

export const close = updateTaskPopupDomain.event();

sample({
	clock: close,
	fn: () => popups.updateTask,
	target: removePopup,
});
