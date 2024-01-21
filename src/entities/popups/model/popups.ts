import { querySync } from 'atomic-router';
import { combine, createDomain, sample } from 'effector';
import { debounce } from 'patronum';

import { controls, getParams } from '@/shared/configs';

const popupsDomain = createDomain();

const deserialize = (popups: string | null) => {
	return popups ? popups.split(',') : [];
};

const $rawPopups = popupsDomain.store<string>('');
export const $popups = combine($rawPopups, deserialize);
export const $mountedPopups = popupsDomain.store<string[]>([]);

export const open = popupsDomain.event<string>();
export const close = popupsDomain.event<string>();
const popupsChanged = debounce({
	source: $popups,
	timeout: 210,
});

querySync({
	controls,
	source: {
		[getParams.popup]: $rawPopups,
	},
});

sample({
	clock: close,
	source: $rawPopups,
	fn: (popups, popup) => {
		return popups.replaceAll(popup, '');
	},
	target: $rawPopups,
});

sample({
	clock: open,
	source: $rawPopups,
	fn: (popups, popup) => {
		return popups ? `${popups},${popup}` : popup;
	},
	target: $rawPopups,
});

sample({
	clock: popupsChanged,
	target: $mountedPopups,
});
