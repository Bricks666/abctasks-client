import * as React from 'react';
import { TextField, TextFieldProps } from '@mui/material';
import {
	FieldValues,
	useController,
	UseControllerProps,
	UseControllerReturn,
} from 'react-hook-form';
import { CommonProps } from '@/types';

export interface FieldProps<FormValues extends FieldValues>
	extends CommonProps,
		UseControllerProps<FormValues>,
		Omit<
			TextFieldProps,
			keyof UseControllerProps | keyof UseControllerReturn
		> {}

export const Field = <FormValues extends FieldValues>(
	props: FieldProps<FormValues>
) => {
	const { name, control, defaultValue, rules, shouldUnregister, ...rest } =
		props;
	const { field, fieldState } = useController({
		name,
		control,
		defaultValue,
		rules,
		shouldUnregister,
	});
	const { ref, ...controls } = field;
	const { error } = fieldState;
	return (
		<TextField
			{...rest}
			{...controls}
			inputRef={ref}
			error={!!error}
			helperText={error?.message}
		/>
	);
};
