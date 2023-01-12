import { TransitionProps } from '@mui/material/transitions';
import { Position } from './types';

export const BASE_DURATION: TransitionProps['timeout'] = 250;
export const BASE_TIMEOUT = 3000;
export const BASE_MAX_COUNT = 3;
export const BASE_POSITION: Position = {
	horizontal: 'left',
	vertical: 'bottom',
};
