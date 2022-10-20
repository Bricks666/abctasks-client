import * as React from 'react';
import {
	ListItemIcon,
	ListItemText,
	MenuItem as MenuItemMUI,
} from '@mui/material';
import { To, Link } from 'react-router-dom';
import { CommonProps } from '@/types/common';

export interface BaseMenuOption {
	readonly label: string;
	readonly icon?: React.ReactElement;
}

export interface ButtonMenuOption extends BaseMenuOption {
	readonly onClick: React.MouseEventHandler<HTMLButtonElement>;
	readonly to?: never;
}

export interface LinkMenuOption extends BaseMenuOption {
	readonly onClick?: never;
	readonly to: To;
}

export type MenuOption = ButtonMenuOption | LinkMenuOption;

export type MenuItemProps = CommonProps &
	MenuOption & {
		readonly role?: React.AriaRole;
	};

export const MenuItem: React.FC<MenuItemProps> = (props) => {
	const { label, icon, onClick, to, ...rest } = props;
	const itemButtonProps = to ? { component: Link, to } : { onClick };
	return (
		<MenuItemMUI {...(itemButtonProps as any)} {...rest}>
			{icon && <ListItemIcon>{icon}</ListItemIcon>}
			<ListItemText>{label}</ListItemText>
		</MenuItemMUI>
	);
};
