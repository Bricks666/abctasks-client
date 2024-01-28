import { querySync } from 'atomic-router';
import { createDomain, sample } from 'effector';
import { debounce } from 'patronum';

import { controls, getParams } from '@/shared/configs';

const popupsDomain = createDomain();

export const $popups = popupsDomain.createStore<string[]>([]);
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
		[getParams.popup]: $popups,
	},
});

sample({
	clock: open,
	source: $popups,
	fn: (popups, popup) => {
		return popups.concat(popup);
	},
	target: $popups,
});

sample({
	clock: close,
	source: $popups,
	fn: (popups, popup) => {
		return popups.filter((name) => popup !== name);
	},
	target: $popups,
});
