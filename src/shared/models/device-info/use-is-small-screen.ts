import { useAtom } from '@reatom/npm-react';

import { isMobileAtom, isTabletVerticalAtom } from './model';

export const useIsSmallScreen = () => {
	return useAtom((ctx) => {
		const isMobile = ctx.spy(isMobileAtom);
		const isVerticalTablet = ctx.spy(isTabletVerticalAtom);

		return isMobile || isVerticalTablet;
	})[0];
};
