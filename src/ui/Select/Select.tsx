import * as React from 'react';
import cn from 'classnames';
import { CommonProps } from '@/types/common';

import styles from './Select.module.css';

export interface SelectProps
	extends CommonProps,
		React.SelectHTMLAttributes<HTMLSelectElement> {}

export const Select = React.forwardRef<
	HTMLSelectElement,
	React.PropsWithChildren<SelectProps>
>(function Select({ className, children, ...select }, ref) {
	return (
		<select className={cn(styles.select, className)} {...select} ref={ref}>
			{children}
		</select>
	);
});
