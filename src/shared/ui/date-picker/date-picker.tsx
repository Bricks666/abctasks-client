import {
	DatePicker as MUIDatePicker,
	DatePickerProps as MUIDatePIckerProps
} from '@mui/x-date-pickers';
import * as React from 'react';
import { CommonProps } from '@/shared/types';

export interface DatePickerProps<TInputDate, TDate>
	extends CommonProps,
		Omit<MUIDatePIckerProps<TInputDate, TDate>, 'onChange'> {
	readonly onChange: (date: string | null) => void;
}

export const DatePicker = React.memo(
	<TInputDate, TDate = TInputDate>(
		props: DatePickerProps<TInputDate, TDate>
	): React.ReactElement => {
		const { onChange, ...rest } = props;
		const handleChange = (date: { $d: Date } | null) => {
			let newDate: string | null;

			try {
				newDate = date?.$d.toJSON() ?? null;
			} catch {
				newDate = null;
			}

			onChange(newDate);
		};
		return <MUIDatePicker {...rest} onChange={handleChange as any} />;
	}
);
