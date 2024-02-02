import { createEvent, createStore, sample } from 'effector';
import { not } from 'patronum';

import { popupsModel } from '@/shared/models';

export interface CreatePopupControlModelParams {
	readonly name: string;
	/**
	 * Should popup be synced with query
	 * @default true
	 */
	readonly sync?: boolean;
}

export const createPopupControlModel = (
	params: CreatePopupControlModelParams
) => {
	const { name, sync = true, } = params;

	const $isOpen = createStore<boolean>(false);
	const close = createEvent();
	const opened = createEvent();
	const open = createEvent();
	const closed = createEvent();

	const openPopup = sync ? popupsModel.openSynced : popupsModel.open;
	const closePopup = sync ? popupsModel.closeSynced : popupsModel.close;

	sample({
		clock: open,
		fn: () => name,
		target: openPopup,
	});

	sample({
		clock: close,
		fn: () => name,
		target: closePopup,
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

	const unitShape = {
		close,
		opened,
		open,
		closed,
		isOpen: $isOpen,
	};

	return {
		$isOpen,
		close,
		opened,
		open,
		closed,
		'@@unitShape': () => unitShape,
	};
};
