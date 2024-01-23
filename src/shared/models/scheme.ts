import { useColorScheme } from '@mui/material';
import { trackMediaQuery } from '@withease/web-api';
import { combine, createEvent, createStore, sample } from 'effector';
import persist from 'effector-localstorage';
import { useUnit } from 'effector-react';
import { useLayoutEffect } from 'react';

import { started } from './app';

export type ColorScheme = 'dark' | 'system' | 'light';

export type BinaryColorScheme = Exclude<ColorScheme, 'system'>;

const { $matches: $preferDark, } = trackMediaQuery(
	'(prefers-color-scheme: dark)',
	{
		setup: started,
	}
);

export const $scheme = createStore<ColorScheme>('system');
export const $biScheme = combine(
	{ scheme: $scheme, preferDark: $preferDark, },
	({ scheme, preferDark, }): BinaryColorScheme => {
		if (scheme !== 'system') {
			return scheme;
		}

		return preferDark ? 'dark' : 'light';
	}
);

export const colorSchemeChanged = createEvent<ColorScheme | null>();

export const useSyncScheme = () => {
	const { setMode, } = useColorScheme();
	const mode = useUnit($biScheme);

	useLayoutEffect(() => {
		setMode(mode);
	}, [mode]);
};

persist({
	store: $scheme,
	key: 'bt-color-scheme',
});

sample({
	clock: colorSchemeChanged,
	source: $scheme,
	fn: (currentScheme, scheme) => scheme ?? currentScheme,
	target: $scheme,
});
