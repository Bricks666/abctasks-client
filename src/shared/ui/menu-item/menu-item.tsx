import {
	ListItemIcon,
	MenuItem as MUIMenuItem,
	MenuItemProps as MUIMenuItemProps
} from '@mui/material';
import { RouteInstance, RouteQuery } from 'atomic-router';
import { Link } from 'atomic-router-react';
import * as React from 'react';

import { CommonProps } from '@/shared/types';

import { useMenuContext } from '../menu';

interface BaseMenuOption {
	readonly label: string;
	readonly icon?: React.ReactElement;
}

interface ButtonMenuOption extends BaseMenuOption {
	readonly onClick?: React.MouseEventHandler<HTMLButtonElement>;
	readonly to?: never;
	readonly params?: never;
	readonly query?: never;
}

interface LinkMenuOption<P extends object> extends BaseMenuOption {
	readonly onClick?: never;
	readonly to: RouteInstance<P>;
	readonly params: P;
	readonly query?: RouteQuery;
}

export type MenuOption<P extends object> = ButtonMenuOption | LinkMenuOption<P>;

export type MenuItemProps<P extends object> = CommonProps &
	MenuOption<P> &
	Omit<MUIMenuItemProps, keyof MenuOption<P>>;

export const MenuItem = <P extends object>(
	props: React.PropsWithChildren<MenuItemProps<P>>
) => {
	const { onClose, } = useMenuContext();

	const { label, icon, onClick, to, params, query, ...rest } = props;

	const handleClick: React.MouseEventHandler<HTMLButtonElement> = (event) => {
		if (onClick) {
			onClick(event);
		}

		if (onClose) {
			onClose();
		}
	};

	const itemButtonProps = to
		? { component: Link, to, params, query, onClick: handleClick, }
		: { onClick: handleClick, };
	return (
		<MUIMenuItem {...rest} {...(itemButtonProps as any)}>
			{icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
			{label}
		</MUIMenuItem>
	);
};
