import { querySync } from 'atomic-router';
import { combine, createEvent, createStore, sample } from 'effector';
import { debounce } from 'patronum';

import { controls, getParams } from '@/shared/configs';

const parsePopups = (raw: string): string[] => {
	return raw.split(',');
};

const $rawPopups = createStore<string>('');

const $querySyncedPopups = $rawPopups
	.map((raw) => parsePopups(raw))
	.map((popups) => popups.filter((popup) => popup !== ''));
const $manualPopups = createStore<string[]>([]);

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
	target: createStore<string[]>([]),
});

export const openSynced = createEvent<string>();
export const closeSynced = createEvent<string>();
export const open = createEvent<string>();
export const close = createEvent<string>();

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
