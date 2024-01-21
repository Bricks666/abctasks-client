import { createEvent, createStore, sample } from 'effector';
import { not } from 'patronum';

import { popupsModel } from '@/shared/models';

export const createPopupControlModel = (name: string) => {
	const $isOpen = createStore(false);
	const close = createEvent();
	const opened = createEvent();
	const open = createEvent();
	const closed = createEvent();

	sample({
		clock: open,
		fn: () => name,
		target: popupsModel.open,
	});

	sample({
		clock: close,
		fn: () => name,
		target: popupsModel.close,
	});

	sample({
		clock: popupsModel.$popups,
		fn: (popups) => popups.includes(name),
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

	return { $isOpen, close, opened, open, closed };
};
