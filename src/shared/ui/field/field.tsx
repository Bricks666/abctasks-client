import { TextField, TextFieldProps } from '@mui/material';
import { ConnectedField } from 'effector-forms';
import * as React from 'react';

import { CommonProps } from '@/shared/types';

export interface FieldProps
	extends CommonProps,
		Partial<
			Pick<
				ConnectedField<any>,
				'isValid' | 'name' | 'onChange' | 'onBlur' | 'value'
			>
		>,
		Omit<TextFieldProps, keyof ConnectedField<any>> {}

export const Field: React.FC<FieldProps> = React.memo((props) => {
	const { isValid, onChange, ...rest } = props;
	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
		onChange?.(evt.target.value);
	};

	return (
		<TextField
			{...(rest as TextFieldProps)}
			onChange={handleChange}
			error={!isValid}
		/>
	);
});
