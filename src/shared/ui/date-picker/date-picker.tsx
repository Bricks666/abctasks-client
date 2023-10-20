import { TextFieldProps } from '@mui/material';
import {
	DatePicker as MUIDatePicker,
	DatePickerProps as MUIDatePIckerProps
} from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import * as React from 'react';

import { CommonProps } from '@/shared/types';

import { Field, FieldProps } from '../field';

type FieldKeys = 'value' | 'onBlur' | 'name' | 'isValid' | 'helperText';

export interface DatePickerProps
	extends CommonProps,
		Pick<FieldProps, FieldKeys>,
		Omit<MUIDatePIckerProps<Dayjs>, FieldKeys | 'onChange'> {
	readonly onChange: (date: string | null) => void;
}

export const DatePicker = React.memo(
	(props: DatePickerProps): React.ReactElement => {
		const { onChange, value, isValid, name, onBlur, helperText, ...rest } =
			props;
		const preparedValue = dayjs(value);
		const handleChange: MUIDatePIckerProps<Dayjs>['onChange'] = (date) => {
			let newDate: string | null;

			try {
				newDate = date?.toDate().toJSON() ?? null;
			} catch {
				newDate = null;
			}

			onChange(newDate);
		};

		const textField = (params: TextFieldProps) => {
			const handleBlur = (...args: any[]) => {
				onBlur?.();
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				params.onBlur?.(...args);
			};

			return (
				<Field
					{...params}
					onBlur={handleBlur}
					isValid={isValid}
					name={name}
					helperText={helperText}
				/>
			);
		};

		return (
			<MUIDatePicker
				{...rest}
				value={preparedValue}
				onChange={handleChange}
				slots={{
					textField,
				}}
			/>
		);
	}
);
