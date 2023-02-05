import {
	FormControl,
	FormLabel,
	ToggleButtonGroup,
	FormHelperText,
	ToggleButtonGroupProps
} from '@mui/material';
import * as React from 'react';
import { CommonProps } from '@/shared/types';

export interface ControlledToggleButtonGroupProps
	extends CommonProps,
		Omit<ToggleButtonGroupProps, 'onChange'> {
	readonly onChange: (value: any) => unknown;
	readonly label?: string;
	readonly error?: boolean;
	readonly helperText?: string;
}

export const ControlledToggleButtonGroup: React.FC<
	ControlledToggleButtonGroupProps
> = (props) => {
	const { error, helperText, label, children, className, onChange, ...rest } =
		props;

	const id = React.useId();

	const changeHandle = (_: unknown, values: string | null) => {
		onChange(values);
	};

	return (
		<FormControl className={className} error={error}>
			<FormLabel htmlFor={id}>{label}</FormLabel>
			<ToggleButtonGroup onChange={changeHandle} {...rest} id={id}>
				{children}
			</ToggleButtonGroup>
			{helperText ? <FormHelperText>{helperText}</FormHelperText> : null}
		</FormControl>
	);
};
