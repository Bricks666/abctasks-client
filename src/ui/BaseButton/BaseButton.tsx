/* eslint-disable react/button-has-type */
import cn from 'classnames';
import * as React from 'react';
import { Link, To } from 'react-router-dom';
import { CommonProps } from '@/interfaces/common';

import BaseButtonStyle from './BaseButton.module.css';

/* Переработать ссылку */
export interface BaseButtonProps
	extends CommonProps,
		React.DOMAttributes<HTMLButtonElement>,
		Omit<React.HTMLAttributes<HTMLButtonElement>, 'className'> {
	readonly to?: To;
	readonly disabled?: boolean;
	readonly buttonType?: 'button' | 'submit' | 'reset';
}

export const BaseButton: React.FC<BaseButtonProps> = ({
	children,
	className,
	disabled,
	to,
	buttonType,
	...props
}) => {
	const classes = cn(BaseButtonStyle.button, className);
	if (to) {
		return (
			<Link className={classes} to={to}>
				{children}
			</Link>
		);
	}
	return (
		<button
			className={classes}
			disabled={disabled}
			{...props}
			type={buttonType}>
			{children}
		</button>
	);
};
