import * as React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { CommonProps } from '@/interfaces/common';
import { Checkbox as CheckboxUI } from '@/ui/Checkbox';

export interface CheckboxProps extends CommonProps, UseFormRegisterReturn {
	readonly disabled?: boolean;
	readonly required?: boolean;
	readonly readOnly?: boolean;
	readonly label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	({ label, ...props }, ref) => {
		return (
			<CheckboxUI {...props} inputRef={ref}>
				{label}
			</CheckboxUI>
		);
	}
);
