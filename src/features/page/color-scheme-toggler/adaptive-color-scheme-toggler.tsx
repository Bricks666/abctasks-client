import { useUnit } from 'effector-react';
import * as React from 'react';

import { deviceInfoModel } from '@/shared/models';
import { CommonProps } from '@/shared/types';

import { DesktopColorschemeToggler } from './desktop-color-scheme-toggler';
import { MobileColorSchemeToggler } from './mobile-color-scheme-toggler';

export interface AdaptiveColorSchemeTogglerProps extends CommonProps {}

export const AdaptiveColorSchemeToggler: React.FC<
	AdaptiveColorSchemeTogglerProps
> = (props) => {
	const [isMobile, isTableVertical] = useUnit([
		deviceInfoModel.$isMobile,
		deviceInfoModel.$isTabletVertical
	]);

	const isMobileToggler = isMobile || isTableVertical;

	if (isMobileToggler) {
		return <MobileColorSchemeToggler {...props} />;
	}

	return <DesktopColorschemeToggler {...props} />;
};
