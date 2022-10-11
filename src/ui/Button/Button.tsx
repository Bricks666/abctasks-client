import cn from 'classnames';
import * as React from 'react';
import { CommonProps } from '@/interfaces/common';
import { Color, Size } from '@/interfaces/ui';
import { BaseButton, BaseButtonProps } from '../BaseButton';
import { Text } from '../Text';

import styles from './Button.module.css';

type Type = 'filed' | 'text' | 'outline';

export interface ButtonProps extends CommonProps, BaseButtonProps {
	readonly color?: Color;
	readonly type?: Type;
	readonly size?: Size;
	readonly icon?: React.ReactElement;
	readonly iconPosition?: 'start' | 'end';
}

export const Button: React.FC<ButtonProps> = ({
	className,
	color = 'primary',
	type = 'filed',
	size = 'medium',
	iconPosition = 'start',
	icon = null,
	children,
	...props
}) => {
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
		<BaseButton className={classes} {...props}>
			{[buttonIcon, children]}
		</BaseButton>
	);
};
