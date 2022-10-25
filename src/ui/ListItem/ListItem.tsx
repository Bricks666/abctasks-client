import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/types';

import styles from './ListItem.module.css';

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
		<li className={cn(styles.item, className)} {...props}>
			{children}
		</li>
	);
};
