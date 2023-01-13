import { TextField, TextFieldProps } from '@mui/material';
import { ConnectedField } from 'effector-forms';
import * as React from 'react';
import { CommonProps } from '@/shared/types';

export interface FieldProps
	extends CommonProps,
		Pick<
			ConnectedField<any>,
			'isValid' | 'name' | 'onChange' | 'onBlur' | 'value'
		>,
		Omit<TextFieldProps, keyof ConnectedField<any>> {
	readonly errorText?: string;
}

export const Field: React.FC<FieldProps> = React.memo((props) => {
	const { isValid, errorText, onChange, ...rest } = props;
	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
		onChange(evt.target.value);
	};
	console.log(props);
	return (
		<TextField
			{...rest}
			onChange={handleChange}
			error={!isValid}
			helperText={errorText}
		/>
	);
});
