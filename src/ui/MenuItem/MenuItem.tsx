import * as React from 'react';
import {
	ListItemIcon,
	ListItemText,
	MenuItem as MenuItemMUI,
} from '@mui/material';
import { Link } from 'atomic-router-react';
import { RouteInstance, RouteQuery } from 'atomic-router';
import { CommonProps } from '@/types';

export interface BaseMenuOption {
	readonly label: string;
	readonly icon?: React.ReactElement;
}

export interface ButtonMenuOption extends BaseMenuOption {
	readonly onClick: React.MouseEventHandler<HTMLButtonElement>;
	readonly to?: never;
	readonly params?: never;
	readonly query?: never;
}

export interface LinkMenuOption<P extends object> extends BaseMenuOption {
	readonly onClick?: React.MouseEventHandler<HTMLButtonElement>;
	readonly to: RouteInstance<P>;
	readonly params: P;
	readonly query?: RouteQuery;
}

export type MenuOption<P extends object> = ButtonMenuOption | LinkMenuOption<P>;

export type MenuItemProps<P extends object> = CommonProps &
	MenuOption<P> & {
		readonly role?: React.AriaRole;
	};

export const MenuItem = <P extends object>(
	props: React.PropsWithChildren<MenuItemProps<P>>
) => {
	const { label, icon, onClick, to, params, query, ...rest } = props;
	const itemButtonProps = to
		? { component: Link, to, params, query, onClick }
		: { onClick, component: 'button' };
	return (
		<MenuItemMUI {...rest} {...(itemButtonProps as any)}>
			{icon && <ListItemIcon>{icon}</ListItemIcon>}
			<ListItemText>{label}</ListItemText>
		</MenuItemMUI>
	);
};
