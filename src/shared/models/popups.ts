import { querySync } from 'atomic-router';
import { createDomain, sample } from 'effector';
import { debounce } from 'patronum';

import { controls, getParams } from '@/shared/configs';

const popupsDomain = createDomain();

const parsePopups = (raw: string): string[] => {
	return raw.split(',');
};

const $rawPopups = popupsDomain.createStore<string>('');
export const $popups = $rawPopups.map(parsePopups);
export const $mountedPopups = debounce({
	source: $popups,
	timeout: 250,
	target: popupsDomain.createStore<string[]>([]),
});

export const open = popupsDomain.event<string>();
export const close = popupsDomain.event<string>();

querySync({
	controls,
	source: {
		[getParams.popup]: $rawPopups,
	},
});

sample({
	clock: open,
	source: $rawPopups,
	fn: (popups, popup) => {
		return popups ? [popups, popup].join(',') : popup;
	},
	target: $rawPopups,
});

sample({
	clock: close,
	source: $rawPopups,
	fn: (popups, popup) => {
		return popups.replaceAll(popup, '');
	},
	target: $rawPopups,
});
