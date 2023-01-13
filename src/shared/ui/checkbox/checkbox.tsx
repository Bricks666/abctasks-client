import {
	FormControlLabel,
	Checkbox as CheckboxMUI,
	CheckboxProps as MUICheckboxProps
} from '@mui/material';
import { ConnectedField } from 'effector-forms';
import * as React from 'react';

import { CommonProps } from '@/shared/types';

export interface CheckboxProps
	extends CommonProps,
		Pick<ConnectedField<any>, 'name' | 'onChange' | 'value'>,
		Omit<MUICheckboxProps, keyof ConnectedField<any>> {
	readonly label?: string | null;
}

export const Checkbox: React.FC<CheckboxProps> = React.memo((props) => {
	const { label, onChange, ...rest } = props;

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (evt) => {
		onChange(evt.target.checked);
	};
	return (
		<FormControlLabel
			control={<CheckboxMUI {...rest} onChange={handleChange} />}
			label={label}
		/>
	);
});
