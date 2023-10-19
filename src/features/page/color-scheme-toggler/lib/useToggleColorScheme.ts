import { useMediaQuery, useColorScheme } from '@mui/material';
import * as React from 'react';

import { ColorScheme } from '../types';

import { getSystemScheme } from './getSystemScheme';

export const useToggleColorScheme = () => {
	const preferDark = useMediaQuery('(prefers-color-scheme: dark)');
	const { setMode, } = useColorScheme();
	const [colorScheme, setColorScheme] = React.useState<ColorScheme>('system');

	const onChange = (value: ColorScheme) => {
		const mode = value === 'system' ? getSystemScheme(preferDark) : value;

		setColorScheme(value);
		setMode(mode);
	};

	React.useEffect(() => {
		if (colorScheme === 'system') {
			setMode(getSystemScheme(preferDark));
		}
	}, [colorScheme, preferDark]);

	return [colorScheme, onChange] as const;
};
