import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/types/common';
import { Color, Size } from '@/types/ui';
import { BaseButton, BaseButtonProps } from '../BaseButton';
import { Text } from '../Text';

import styles from './Button.module.css';

type Type = 'filed' | 'text' | 'outline';

export type ButtonProps<E extends React.ElementType> = CommonProps &
	BaseButtonProps<E> & {
		readonly color?: Color;
		readonly type?: Type;
		readonly size?: Size;
		readonly icon?: React.ReactElement;
		readonly iconPosition?: 'start' | 'end';
	};

export const Button = <E extends React.ElementType>(
	props: ButtonProps<E>
): React.ReactElement => {
	const {
		className,
		color = 'primary',
		type = 'filed',
		size = 'medium',
		iconPosition = 'start',
		icon = null,
		children,
		...rest
	} = props;
	const classes = cn(
		styles.button,
		styles[type],
		styles[color],
		styles[size],
		className
	);

	const buttonIcon = icon ? (
		<Text
			className={styles[`icon--${iconPosition}`]}
			component='span'
			variant='p'>
			{icon}
		</Text>
	) : null;

	return (
		<BaseButton className={classes} {...rest}>
			{[buttonIcon, children]}
		</BaseButton>
	);
};
