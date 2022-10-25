import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/types';
import { BaseButton, BaseButtonProps } from '../BaseButton';

import styles from './ListItemButton.module.css';

export type ListItemButtonProps<E extends React.ElementType> = CommonProps &
	BaseButtonProps<E>;

export const ListItemButton = <E extends React.ElementType>(
	props: ListItemButtonProps<E>
) => {
	const { className, children, ...rest } = props;
	return (
		<BaseButton className={cn(styles.button, className)} {...rest}>
			{children}
		</BaseButton>
	);
};
