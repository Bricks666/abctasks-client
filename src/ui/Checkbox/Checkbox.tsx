import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/types/common';
import { Color, Size } from '@/types/ui';
import { InputLabel } from '../InputLabel';

import styles from './Checkbox.module.css';

export interface CheckboxProps extends CommonProps {
	readonly name: string;
	readonly checked?: boolean;
	readonly onChange?: React.ChangeEventHandler;
	readonly onFocus?: React.FocusEventHandler;
	readonly onBlur?: React.FocusEventHandler;
	readonly require?: boolean;
	readonly readOnly?: boolean;
	readonly inputId?: string;
	readonly size?: Size;
	readonly color?: Color;
	readonly inputRef?: React.Ref<HTMLInputElement>;
}

export const Checkbox: React.FC<React.PropsWithChildren<CheckboxProps>> = ({
	className,
	children,
	inputId,
	inputRef,
	color = 'primary',
	size = 'medium',
	...checkbox
}) => {
	const classes = cn(
		styles.label,
		styles[color as keyof typeof styles],
		styles[size]
	);

	const id = inputId || checkbox.name;

	return (
		<div className={cn(styles.container, className)}>
			<input
				className={cn(styles.input, 'visibility-hidden')}
				{...checkbox}
				type='checkbox'
				id={id}
				ref={inputRef}
			/>
			<InputLabel className={classes} HTMLFor={id}>
				{children}
			</InputLabel>
		</div>
	);
};
