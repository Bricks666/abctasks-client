import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
import * as React from 'react';

import { colorSchemeModel } from '@/shared/models';

export const ICONS_MAP: Record<
	colorSchemeModel.ColorScheme,
	React.ComponentType
> = {
	dark: DarkModeIcon,
	system: ModeStandbyIcon,
	light: LightModeIcon,
};

export interface Scheme {
	readonly value: colorSchemeModel.ColorScheme;
	readonly icon: React.ComponentType;
}

export const SCHEMES: colorSchemeModel.ColorScheme[] = [
	'dark',
	'system',
	'light'
];
