import { querySync } from 'atomic-router';
import { createDomain, sample } from 'effector';
import { controls } from '@/shared/configs';
import { getParams } from '@/shared/const';

const popupsDomain = createDomain();

export const $popups = popupsDomain.store<string>('');

export const close = popupsDomain.event<string>();

querySync({
	controls,
	source: {
		[getParams.popup]: $popups,
	},
});

sample({
	clock: close,
	source: $popups,
	fn: (popups, popup) => {
		return popups.replaceAll(popup, '');
	},
	target: $popups,
});
