import { AlertColor } from '@mui/material';

export interface Notification {
	readonly content: string;
	readonly variant?: AlertColor;
}
