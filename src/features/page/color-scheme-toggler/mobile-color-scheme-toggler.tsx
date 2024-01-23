import {
	IconButton,
	ListItemIcon,
	Menu,
	MenuItem,
	Tooltip
} from '@mui/material';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { useToggle } from '@/shared/lib';
import { colorSchemeModel } from '@/shared/models';
import { CommonProps } from '@/shared/types';

import { ICONS_MAP, SCHEMES } from './config';
import { useToggleColorScheme } from './lib';

export interface MobileColorSchemeTogglerProps extends CommonProps {}

export const MobileColorSchemeToggler: React.FC<
	MobileColorSchemeTogglerProps
> = (props) => {
	const { className, } = props;
	const [opened, handlers] = useToggle();
	const { t, } = useTranslation('common');
	const [ref, setRef] = React.useState<HTMLElement | null>(null);
	const [colorScheme, changeColorScheme] = useToggleColorScheme();

	const SelectedIcon = ICONS_MAP[colorScheme];

	const createOnChange = (value: colorSchemeModel.ColorScheme) => {
		return () => {
			changeColorScheme(value);
			handlers.toggleOff();
		};
	};

	const activated = t('color_schemes.activated', { scheme: colorScheme, });

	return (
		<>
			<Tooltip title={activated}>
				<IconButton
					className={className}
					onClick={handlers.toggleOn}
					ref={setRef}>
					<SelectedIcon />
				</IconButton>
			</Tooltip>
			<Menu
				open={opened}
				anchorEl={ref}
				onClose={handlers.toggleOff}
				anchorOrigin={{
					horizontal: 'right',
					vertical: 'bottom',
				}}
				transformOrigin={{
					horizontal: 'right',
					vertical: 'top',
				}}
				MenuListProps={{
					disablePadding: true,
				}}>
				{SCHEMES.map((scheme) => {
					return (
						<MenuItem
							onClick={createOnChange(scheme)}
							selected={colorScheme === scheme}
							key={scheme}>
							<ListItemIcon>
								{React.createElement(ICONS_MAP[scheme])}
							</ListItemIcon>
							{t(`color_schemes.schemes.${scheme}`)}
						</MenuItem>
					);
				})}
			</Menu>
		</>
	);
};
