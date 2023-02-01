import { createDomain, sample } from 'effector';

const menuDomain = createDomain();

export const $isOpen = menuDomain.store<boolean>(false);

export const close = menuDomain.event();
export const open = menuDomain.event();

sample({
	clock: close,
	fn: () => false,
	target: $isOpen,
});

sample({
	clock: open,
	fn: () => true,
	target: $isOpen,
});
