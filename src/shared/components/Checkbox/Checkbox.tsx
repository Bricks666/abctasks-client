import * as React from 'react';
import {
	FormControlLabel,
	Checkbox as CheckboxMUI,
	CheckboxProps as MUICheckboxProps
} from '@mui/material';
import {
	FieldValues,
	useController,
	UseControllerProps,
	UseControllerReturn
} from 'react-hook-form';
import { CommonProps } from '@/types';

export interface CheckboxProps<FormValues extends FieldValues>
	extends CommonProps,
		UseControllerProps<FormValues>,
		Omit<
			MUICheckboxProps,
			keyof UseControllerProps | keyof UseControllerReturn
		> {
	readonly label?: string | null;
}

export const Checkbox = <FormValues extends FieldValues>(
	props: CheckboxProps<FormValues>
) => {
	const {
		label,
		name,
		control,
		defaultValue,
		rules,
		shouldUnregister,
		...rest
	} = props;
	const { field, } = useController({
		name,
		control,
		defaultValue,
		rules,
		shouldUnregister,
	});
	const { ref, ...controls } = field;
	return (
		<FormControlLabel
			control={<CheckboxMUI {...rest} {...controls} inputRef={ref} />}
			label={label}
		/>
	);
};
