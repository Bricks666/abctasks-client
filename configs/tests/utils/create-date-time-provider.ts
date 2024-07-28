import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PropsWithChildren, createElement } from 'react';

export const createDateTimeProvider = () => {
	return (props: PropsWithChildren) => {
		return createElement(LocalizationProvider, {
			dateAdapter: AdapterDayjs,
			children: props.children,
		});
	};
};
