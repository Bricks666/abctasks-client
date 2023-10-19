import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import * as React from 'react';

import { CommonProps } from '@/shared/types';

import { ICONS_MAP, SCHEMES } from './config';
import { useToggleColorScheme } from './lib';
import { ColorScheme } from './types';

export interface DesktopColorSchemeTogglerProps extends CommonProps {
	readonly size?: 'small' | 'medium' | 'large';
}

export const DesktopColorschemeToggler: React.FC<
	DesktopColorSchemeTogglerProps
> = (props) => {
	const { className, size = 'small', } = props;
	const [colorScheme, changeColorScheme] = useToggleColorScheme();

	const onChange = (_event: unknown, value: ColorScheme) => {
		changeColorScheme(value);
	};

	return (
		<ToggleButtonGroup
			className={className}
			value={colorScheme}
			onChange={onChange}
			aria-label='color scheme'
			size={size}
			color='primary'
			exclusive>
			{SCHEMES.map((scheme) => {
				return (
					<ToggleButton value={scheme} aria-label={`${scheme} scheme`}>
						{React.createElement(ICONS_MAP[scheme])}
					</ToggleButton>
				);
			})}
		</ToggleButtonGroup>
	);
};
