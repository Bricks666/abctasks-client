import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/interfaces/common';
import { BaseButton, BaseButtonProps } from '../BaseButton';

import styles from './ListItemButton.module.css';

export interface ListItemButtonProps extends CommonProps, BaseButtonProps {}

export const ListItemButton: React.FC<ListItemButtonProps> = ({
	className,
	children,
	...props
}) => {
	return (
		<BaseButton className={cn(styles.button, className)} {...props}>
			{children}
		</BaseButton>
	);
};
