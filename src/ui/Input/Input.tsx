/* eslint-disable prefer-rest-params */
import cn from 'classnames';
import React, {
	ChangeEventHandler,
	HTMLInputTypeAttribute,
	memo,
	FocusEventHandler,
	forwardRef,
} from 'react';
import { CommonProps } from '@/types';

import styles from './Input.module.css';

export interface InputProps extends CommonProps {
	readonly value?: string | number;
	readonly onChange?: ChangeEventHandler;
	readonly onFocus?: FocusEventHandler;
	readonly type?: HTMLInputTypeAttribute;
	readonly name?: string;
	readonly disabled?: boolean;
	readonly readOnly?: boolean;
	readonly id?: string;
}

export const Input = memo(
	forwardRef<HTMLInputElement, InputProps>(function Input(
		{ className, type = 'text', ...input },
		ref
	) {
		const classes = cn(styles.input, className);
		return <input className={classes} type={type} {...input} ref={ref} />;
	})
);
