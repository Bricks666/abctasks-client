import * as React from 'react';

import { useIsSmallScreen } from '@/shared/models';
import { CommonProps } from '@/shared/types';

import { DesktopColorschemeToggler } from './desktop-color-scheme-toggler';
import { MobileColorSchemeToggler } from './mobile-color-scheme-toggler';

export interface AdaptiveColorSchemeTogglerProps extends CommonProps {}

export const AdaptiveColorSchemeToggler: React.FC<
	AdaptiveColorSchemeTogglerProps
> = (props) => {
	const isMobileToggler = useIsSmallScreen();

	if (isMobileToggler) {
		return <MobileColorSchemeToggler {...props} />;
	}

	return <DesktopColorschemeToggler {...props} />;
};
