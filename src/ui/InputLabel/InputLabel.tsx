import * as React from 'react';
import classNames from 'classnames';
import { CommonProps } from '@/interfaces/common';

import InputLabelStyle from './InputLabel.module.css';

export interface InputLabelProps extends CommonProps {
	readonly HTMLFor: string;
}

export const InputLabel: React.FC<React.PropsWithChildren<InputLabelProps>> = ({
	HTMLFor,
	children,
	className,
}) => {
	const classes = classNames(InputLabelStyle.label, className);
	return (
		<label className={classes} htmlFor={HTMLFor}>
			{children}
		</label>
	);
};
