import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { IconButton, InputAdornment } from '@mui/material';
import * as React from 'react';

import { useToggle } from '@/shared/lib';

import { Field, FieldProps } from '../field';

export interface PasswordFieldProps
	extends Omit<FieldProps, 'select' | 'type' | 'multiline'> {}

export const PasswordField: React.FC<PasswordFieldProps> = (props) => {
	const { InputProps, } = props;
	const [showPassword, handlers] = useToggle(false);

	const type = showPassword ? 'text' : 'password';

	return (
		<Field
			{...props}
			type={type}
			InputProps={{
				...InputProps,
				endAdornment: (
					<InputAdornment position='end'>
						<IconButton onClick={handlers.toggle}>
							{showPassword ? <VisibilityOff /> : <Visibility />}
						</IconButton>
					</InputAdornment>
				),
			}}
		/>
	);
};
