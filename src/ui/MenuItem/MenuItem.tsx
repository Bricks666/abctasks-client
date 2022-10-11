import * as React from 'react';
import { Path } from 'react-router-dom';
import { CommonProps } from '@/interfaces/common';
import { ListItem } from '../ListItem';
import { ListItemButton } from '../ListItemButton';
import { Text } from '../Text';

export type MenuOption = {
	readonly label: string;
	readonly onClick?: React.MouseEventHandler;
	readonly to?: Path | string;
	readonly icon?: React.ReactElement;
};

export interface MenuItemProps
	extends CommonProps,
		MenuOption,
		React.AriaAttributes {
	readonly style?: React.CSSProperties;
	readonly role?: React.AriaRole;
}

export const MenuItem: React.FC<MenuItemProps> = ({
	label,
	icon,
	onClick,
	to,
	role = 'menuitem',
	...props
}) => {
	return (
		<ListItem role={role} {...props}>
			<ListItemButton onClick={onClick} to={to} tabIndex={0}>
				{icon}
				<Text component='span'>{label}</Text>
			</ListItemButton>
		</ListItem>
	);
};
