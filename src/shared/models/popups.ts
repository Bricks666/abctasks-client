import { querySync } from 'atomic-router';
import { combine, createDomain, sample } from 'effector';
import { debounce } from 'patronum';

import { controls, getParams } from '@/shared/configs';

const popupsDomain = createDomain();

const parsePopups = (raw: string): string[] => {
	return raw.split(',');
};

const $rawPopups = popupsDomain.createStore<string>('');
const $querySyncedPopups = $rawPopups.map(parsePopups);
const $manualPopups = popupsDomain.createStore<string[]>([]);

export const $popups = combine(
	$querySyncedPopups,
	$manualPopups,
	(parsed, manual) => {
		return parsed.concat(manual);
	}
);
export const $mountedPopups = debounce({
	source: $popups,
	timeout: 250,
	target: popupsDomain.createStore<string[]>([]),
});

export const openSynced = popupsDomain.event<string>();
export const closeSynced = popupsDomain.event<string>();
export const open = popupsDomain.event<string>();
export const close = popupsDomain.event<string>();

sample({
	clock: openSynced,
	source: $rawPopups,
	fn: (popups, popup) => {
		return popups ? [popups, popup].join(',') : popup;
	},
	target: $rawPopups,
});

sample({
	clock: closeSynced,
	source: $rawPopups,
	fn: (popups, popup) => {
		return popups.replaceAll(popup, '');
	},
	target: $rawPopups,
});

sample({
	clock: open,
	source: $manualPopups,
	fn: (popups, popup) => {
		return popups.concat(popup);
	},
	target: $manualPopups,
});

sample({
	clock: close,
	source: $manualPopups,
	fn: (popups, popup) => {
		return popups.filter((name) => name !== popup);
	},
	target: $manualPopups,
});

querySync({
	controls,
	source: {
		[getParams.popup]: $rawPopups,
	},
});
