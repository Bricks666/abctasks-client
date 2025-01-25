import {
	atom,
	mapState,
	onConnect,
	readonly,
	withInit
} from '@reatom/framework';

import { calculateDevice } from './lib';
import { Devices } from './types';

// eslint-disable-next-line no-underscore-dangle
const _deviceAtom = atom<Devices>('desktop-large', '_deviceAtom').pipe(
	withInit(() => {
		return calculateDevice();
	})
);

onConnect(_deviceAtom, (ctx) => {
	window.addEventListener(
		'resize',
		() => {
			_deviceAtom(ctx, calculateDevice());
		},
		{
			signal: ctx.controller.signal,
		}
	);
});

export const deviceAtom = readonly(_deviceAtom);

export const isMobileAtom = deviceAtom.pipe(
	mapState((_ctx, device) => device === 'mobile')
);
export const isTabletVerticalAtom = deviceAtom.pipe(
	mapState((_ctx, device) => device === 'tablet-vertical')
);
export const isTabletHorizontalAtom = deviceAtom.pipe(
	mapState((_ctx, device) => device === 'tablet-horizontal')
);
export const isDesktopSmallAtom = deviceAtom.pipe(
	mapState((_ctx, device) => device === 'desktop-small')
);
export const isDesktopLargeAtom = deviceAtom.pipe(
	mapState((_ctx, device) => device === 'desktop-large')
);
