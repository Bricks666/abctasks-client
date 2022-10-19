import * as React from 'react';
import { FormControlLabel, Checkbox as CheckboxMUI } from '@mui/material';
import { UseFormRegisterReturn } from 'react-hook-form';
import { CommonProps } from '@/types/common';

export interface CheckboxProps extends CommonProps, UseFormRegisterReturn {
	readonly disabled?: boolean;
	readonly required?: boolean;
	readonly readOnly?: boolean;
	readonly label?: string;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
	({ label, ...props }, ref) => {
		return (
			<FormControlLabel
				control={<CheckboxMUI {...props} inputRef={ref} />}
				label={label}
			/>
		);
	}
);
