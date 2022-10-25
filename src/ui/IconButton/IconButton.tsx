import cn from 'classnames';
import * as React from 'react';
import { CommonProps, Size } from '@/types';
import { BaseButton, BaseButtonProps } from '../BaseButton';

import styles from './IconButton.module.css';

export type IconButtonProps<E extends React.ElementType> = CommonProps &
	BaseButtonProps<E> & {
		readonly size?: Size;
	};

export const IconButton = <E extends React.ElementType>(
	props: IconButtonProps<E>
): React.ReactElement => {
	const { className, children, size = 'medium', ...rest } = props;
	const classes = cn(styles.button, styles[size], className);
	return (
		<BaseButton className={classes} {...rest}>
			{children}
		</BaseButton>
	);
};
