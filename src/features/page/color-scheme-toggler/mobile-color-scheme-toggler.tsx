import { IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import * as React from 'react';

import { useToggle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';

import { ICONS_MAP, SCHEMES } from './config';
import { useToggleColorScheme } from './lib';
import { ColorScheme } from './types';

export interface MobileColorSchemeTogglerProps extends CommonProps {}

export const MobileColorSchemeToggler: React.FC<
	MobileColorSchemeTogglerProps
> = (props) => {
	const { className, } = props;
	const [opened, handlers] = useToggle();
	const [ref, setRef] = React.useState<HTMLElement | null>(null);
	const [colorScheme, changeColorScheme] = useToggleColorScheme();

	const SelectedIcon = ICONS_MAP[colorScheme];

	const createOnChange = (value: ColorScheme) => {
		return () => {
			changeColorScheme(value);
			handlers.toggleOff();
		};
	};

	return (
		<>
			<IconButton
				className={className}
				onClick={handlers.toggleOn}
				ref={setRef}>
				<SelectedIcon />
			</IconButton>
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
				}}>
				{SCHEMES.map((scheme) => {
					return (
						<MenuItem onClick={createOnChange(scheme)} key={scheme}>
							<ListItemIcon>
								{React.createElement(ICONS_MAP[scheme])}
							</ListItemIcon>
							{scheme}
						</MenuItem>
					);
				})}
			</Menu>
		</>
	);
};
