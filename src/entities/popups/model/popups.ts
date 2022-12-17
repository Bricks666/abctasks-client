import { querySync } from 'atomic-router';
import { createDomain, sample } from 'effector';
import { controls, getParams } from '@/shared/configs';

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
