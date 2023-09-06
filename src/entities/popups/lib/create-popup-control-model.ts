import { createEvent, createStore, sample } from 'effector';

import { popupsModel } from '../model';

export const createPopupControlModel = (popup: string) => {
	const $isOpen = createStore<boolean>(false);
	const close = createEvent();
	const opened = createEvent();

	sample({
		clock: close,
		fn: () => popup,
		target: popupsModel.close,
	});

	sample({
		clock: popupsModel.$popups,
		filter: (popups) => popups.includes(popup),
		target: opened,
	});

	sample({
		clock: opened,
		fn: () => true,
		target: $isOpen,
	});

	sample({
		clock: close,
		fn: () => false,
		target: $isOpen,
	});

	return { $isOpen, close, opened, };
};
