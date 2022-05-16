import React, { forwardRef, PropsWithChildren } from "react";
import { TextField, StandardTextFieldProps } from "@mui/material";

interface FieldProps extends StandardTextFieldProps {
	readonly accept?: string;
}

export const Field = forwardRef<
	HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement,
	PropsWithChildren<FieldProps>
>((props, ref) => {
	return (
		<TextField
			{...props}
			error={!!props.error}
			helperText={props.error}
			variant="standard"
			inputRef={ref}
		/>
	);
});
