import { Devices } from './types';

export const calculateDevice = (): Devices => {
	const { innerWidth: width, } = window;

	if (width <= 540) {
		return 'mobile';
	}

	if (width <= 720) {
		return 'tablet-vertical';
	}

	if (width <= 1200) {
		return 'tablet-horizontal';
	}
	if (width <= 1440) {
		return 'desktop-small';
	}

	return 'desktop-large';
};
