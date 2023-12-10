import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { colorSchemeModel } from '@/shared/models';
import { CommonProps } from '@/shared/types';

import { ICONS_MAP, SCHEMES } from './config';
import { useToggleColorScheme } from './lib';

export interface DesktopColorSchemeTogglerProps extends CommonProps {
	readonly size?: 'small' | 'medium' | 'large';
}

export const DesktopColorschemeToggler: React.FC<
	DesktopColorSchemeTogglerProps
> = (props) => {
	const { className, size = 'small', } = props;
	const { t, } = useTranslation('common');
	const [colorScheme, changeColorScheme] = useToggleColorScheme();

	const onChange = (_event: unknown, value: colorSchemeModel.ColorScheme) => {
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
					<Tooltip title={t(`color_schemes.schemes.${scheme}`)} key={scheme}>
						<ToggleButton
							value={scheme}
							selected={colorScheme === scheme}
							aria-label={`${scheme} scheme`}>
							{React.createElement(ICONS_MAP[scheme])}
						</ToggleButton>
					</Tooltip>
				);
			})}
		</ToggleButtonGroup>
	);
};
