import * as React from 'react';
import { To, Link } from 'react-router-dom';
import { CommonProps } from '@/types/common';
import { ListItem } from '../ListItem';
import { ListItemButton, ListItemButtonProps } from '../ListItemButton';
import { Text } from '../Text';

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
	const { label, icon, onClick, to, role = 'menuitem', ...rest } = props;
	const itemButtonProps: ListItemButtonProps<typeof Link | 'button'> = to
		? { component: Link, to }
		: { onClick };
	return (
		<ListItem role={role} {...rest}>
			<ListItemButton {...itemButtonProps}>
				{icon}
				<Text component='span'>{label}</Text>
			</ListItemButton>
		</ListItem>
	);
};
