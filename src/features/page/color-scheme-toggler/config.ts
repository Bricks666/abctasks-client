import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import ModeStandbyIcon from '@mui/icons-material/ModeStandby';
import * as React from 'react';

import { ColorScheme } from './types';

export const ICONS_MAP: Record<ColorScheme, React.ComponentType> = {
	dark: DarkModeIcon,
	system: ModeStandbyIcon,
	light: LightModeIcon,
};

export interface Scheme {
	readonly value: ColorScheme;
	readonly icon: React.ComponentType;
}

export const SCHEMES: ColorScheme[] = ['dark', 'system', 'light'];
