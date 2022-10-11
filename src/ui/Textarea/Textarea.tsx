import cn from 'classnames';
import React, {
	ChangeEventHandler,
	FocusEventHandler,
	forwardRef,
} from 'react';
import { CommonProps } from '@/interfaces/common';

import styles from './Textarea.module.css';

export interface TextareaProps extends CommonProps {
	readonly value?: string | number;
	readonly onChange?: ChangeEventHandler;
	readonly onFocus?: FocusEventHandler;
	readonly onBlur?: FocusEventHandler;
	readonly id?: string;
	readonly disabled?: boolean;
	readonly readOnly?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
	({ className, ...textarea }, ref) => {
		const classes = cn(styles.textarea, className);
		return <textarea className={classes} {...textarea} ref={ref} />;
	}
);
