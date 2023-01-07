import { ListItemIcon, MenuItem as MenuItemMUI } from '@mui/material';
import { RouteInstance, RouteQuery } from 'atomic-router';
import { Link } from 'atomic-router-react';
import * as React from 'react';
import { CommonProps } from '@/shared/types';

interface BaseMenuOption {
	readonly label: string;
	readonly icon?: React.ReactElement;
}

interface ButtonMenuOption extends BaseMenuOption {
	readonly onClick: React.MouseEventHandler<HTMLButtonElement>;
	readonly to?: never;
	readonly params?: never;
	readonly query?: never;
}

interface LinkMenuOption<P extends object> extends BaseMenuOption {
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
		? { component: Link, to, params, query, }
		: { onClick, };
	return (
		<MenuItemMUI {...rest} {...(itemButtonProps as any)}>
			{icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
			{label}
		</MenuItemMUI>
	);
};