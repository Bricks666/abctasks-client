import * as React from 'react';
import {
	FormControl,
	InputLabel,
	Select as MUISelect,
	SelectProps as MUISelectProps,
} from '@mui/material';
import {
	FieldValues,
	useController,
	UseControllerProps,
	UseControllerReturn,
} from 'react-hook-form';
import { CommonProps } from '@/types';

export interface SelectProps<FormValues extends FieldValues>
	extends CommonProps,
		UseControllerProps<FormValues>,
		Omit<MUISelectProps, keyof UseControllerProps | keyof UseControllerReturn> {
	readonly label?: string;
}

export const Select = <FormValues extends FieldValues>({
	children,
	control,
	name,
	defaultValue,
	rules,
	shouldUnregister,
	label,
	...select
}: React.PropsWithChildren<SelectProps<FormValues>>) => {
	const { field } = useController({
		name,
		control,
		defaultValue,
		rules,
		shouldUnregister,
	});
	const { ref, ...controls } = field;
	const labelId = React.useId();
	const id = React.useId();
	return (
		<FormControl>
			<InputLabel id={labelId}>{label}</InputLabel>
			<MUISelect
				{...select}
				{...controls}
				labelId={labelId}
				id={id}
				inputRef={ref}>
				{children}
			</MUISelect>
		</FormControl>
	);
};
