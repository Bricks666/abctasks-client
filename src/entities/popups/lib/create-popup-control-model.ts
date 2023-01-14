import { createEvent, sample } from 'effector';
import { popupsModel } from '../model';

export const createPopupControlModel = (popup: string) => {
	const $isOpen = popupsModel.$popups.map((popups) => popups.includes(popup));
	const close = createEvent();

	sample({
		clock: close,
		fn: () => popup,
		target: popupsModel.close,
	});

	return { $isOpen, close, };
};
