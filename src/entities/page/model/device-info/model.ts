import { createDomain, sample } from 'effector';
import { calculateDevice } from './lib';
import { Devices } from './types';

const deviceInfoDomain = createDomain();

export const $device = deviceInfoDomain.store<Devices>('desktop-large');

export const $isMobile = $device.map((device) => device === 'mobile');
export const $isTabletVertical = $device.map(
	(device) => device === 'tablet-vertical'
);
export const $isTabletHorizontal = $device.map(
	(device) => device === 'tablet-horizontal'
);
export const $isDesktopSmall = $device.map(
	(device) => device === 'desktop-small'
);
export const $isDesktopLarge = $device.map(
	(device) => device === 'desktop-large'
);

const calculateDeviceFx = deviceInfoDomain.effect<unknown, Devices>(
	calculateDevice
);

export const subscribeFx = deviceInfoDomain.effect(() =>
	window.addEventListener('resize', calculateDeviceFx)
);

export const unsubscribeFx = deviceInfoDomain.effect(() =>
	window.removeEventListener('resize', calculateDeviceFx)
);

sample({
	clock: calculateDeviceFx.doneData,
	target: $device,
});
