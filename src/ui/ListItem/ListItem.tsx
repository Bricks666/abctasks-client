import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/interfaces/common';

import ListItemStyle from './ListItem.module.css';

export interface ListItemProps extends CommonProps {
	readonly role?: React.AriaRole;
	readonly tabIndex?: number;
}

export const ListItem: React.FC<React.PropsWithChildren<ListItemProps>> = ({
	children,
	className,
	...props
}) => {
	return (
		<li className={cn(ListItemStyle.item, className)} {...props}>
			{children}
		</li>
	);
};
