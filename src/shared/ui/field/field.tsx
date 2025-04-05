import { TextField, TextFieldProps } from '@mui/material';
import { type ChangeEventHandler, type FC, memo } from 'react';

import type { CommonProps, Fn } from '@/shared/types';

export interface FieldProps
	extends CommonProps,
		Omit<TextFieldProps, 'onChange'> {
	readonly label?: string;
	readonly onChange?: Fn<[value: string], void>;
	readonly value?: any;
	readonly isError?: boolean;
}

export const Field: FC<FieldProps> = memo((props) => {
	const { isError, onChange, ...rest } = props;
	const handleChange: ChangeEventHandler<HTMLInputElement> = (evt) => {
		onChange?.(evt.target.value);
	};

	return (
		<TextField
			{...(rest as TextFieldProps)}
			onChange={handleChange}
			error={!isError}
		/>
	);
});
