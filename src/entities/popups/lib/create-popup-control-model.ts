import { combine, createEvent, sample } from 'effector';

import { popupsModel } from '../model';

export const createPopupControlModel = (name: string) => {
	const $isOpen = combine(popupsModel.$popups, (popups) =>
		popups.includes(name)
	);
	const close = createEvent();
	const opened = createEvent();
	const open = createEvent();

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
		filter: (popups) => popups.includes(name),
		target: opened,
	});

	return { $isOpen, close, opened, open, };
};
