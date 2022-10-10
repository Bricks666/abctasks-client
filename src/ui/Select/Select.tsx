import * as React from 'react';
import classNames from 'classnames';
import { CommonProps } from '@/interfaces/common';

import SelectStyle from './Select.module.css';

export interface SelectProps extends CommonProps {
	readonly id?: string;
	readonly value?: number | string;
	readonly onChange?: React.ChangeEventHandler;
	readonly onFocus?: React.FocusEventHandler;
	readonly onBlur?: React.FocusEventHandler;
}

export const Select = React.forwardRef<
	HTMLSelectElement,
	React.PropsWithChildren<SelectProps>
>(function Select({ className, children, ...select }, ref) {
	return (
		<select
			className={classNames(SelectStyle.select, className)}
			{...select}
			ref={ref}>
			{children}
		</select>
	);
});
