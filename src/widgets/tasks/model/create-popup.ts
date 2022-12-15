import { createDomain, sample } from 'effector';
import { popups } from '@/shared/const';
import { removePopup } from '@/shared/models/routes';

const createTaskPopupDomain = createDomain();

export const close = createTaskPopupDomain.event();

sample({
	clock: close,
	fn: () => popups.createTask,
	target: removePopup,
});
