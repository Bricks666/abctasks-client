import { AnyObject } from "@/interfaces/common";
import {
	FormControl,
	FormControlProps,
	FormHelperText,
	FormLabel,
	Select as MUISelect,
} from "@mui/material";
import React, { PropsWithChildren } from "react";
import { Control, useController, Path } from "react-hook-form";

interface SelectProps<T extends AnyObject> extends FormControlProps {
	readonly control: Control<T>;
	readonly name: Path<T>;
	readonly label?: string;
}

export const Select = <T extends AnyObject>({
	control,
	name,
	label,
	children,
	...props
}: PropsWithChildren<SelectProps<T>>) => {
	const { field, fieldState } = useController({ name, control });
	const { error } = fieldState;
	return (
		<FormControl {...props} error={!!error} fullWidth>
			<FormLabel htmlFor={name}>{label}</FormLabel>
			<MUISelect {...field} id={name}>
				{children}
			</MUISelect>
			<FormHelperText error={!!error}>{error?.message}</FormHelperText>
		</FormControl>
	);
};
