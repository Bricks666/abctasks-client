import { createEvent, createStore, sample } from 'effector';
import { not } from 'patronum';

import { popupsModel } from '@/shared/models';

export const createPopupControlModel = (popup: string) => {
	const $isOpen = createStore<boolean>(false);
	const close = createEvent();
	const opened = createEvent();
	const open = createEvent();
	const closed = createEvent();

	sample({
		clock: open,
		fn: () => popup,
		target: popupsModel.open,
	});

	sample({
		clock: close,
		fn: () => popup,
		target: popupsModel.close,
	});

	sample({
		clock: popupsModel.$popups,
		fn: (popups) => popups.includes(popup),
		target: $isOpen,
	});

	sample({
		clock: $isOpen,
		filter: Boolean,
		target: opened,
	});

	sample({
		clock: not($isOpen),
		filter: Boolean,
		target: closed,
	});

	return { $isOpen, close, opened, open, closed, };
};
