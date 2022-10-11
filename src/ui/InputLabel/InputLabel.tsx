import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/interfaces/common';

import styles from './InputLabel.module.css';

export interface InputLabelProps extends CommonProps {
	readonly HTMLFor: string;
}

export const InputLabel: React.FC<React.PropsWithChildren<InputLabelProps>> = ({
	HTMLFor,
	children,
	className,
}) => {
	const classes = cn(styles.label, className);
	return (
		<label className={classes} htmlFor={HTMLFor}>
			{children}
		</label>
	);
};
