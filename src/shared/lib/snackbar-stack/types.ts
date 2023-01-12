import { AlertProps, SlideProps } from '@mui/material';
import { TransitionProps } from '@mui/material/transitions';
import { VoidFunction } from '@/shared/types';

export type Vertical = 'top' | 'bottom';
export type Horizontal = 'left' | 'right' | 'center';
export type Duration = TransitionProps['timeout'];
export type Variant = AlertProps['variant'];
export type Direction = SlideProps['direction'];
export type Color = AlertProps['color'];

export interface Position {
	readonly horizontal: Horizontal;
	readonly vertical: Vertical;
}

export interface BaseOptions {
	readonly duration?: Duration;
	readonly variant?: Variant;
}

export interface FabricOptions extends BaseOptions {
	readonly timeout: number;
	readonly maxCount: number;
	readonly position: Position;
}

export interface Snackbar extends BaseOptions {
	readonly id: number;
	readonly message: string;
	readonly open: boolean;
	readonly onClose: VoidFunction;
	readonly onMounted: VoidFunction;
	readonly onUnmounted: VoidFunction;
	readonly direction: Direction;
	readonly color?: Color;
}

export interface CreateSnackbarOptions
	extends Pick<Snackbar, 'message' | 'color' | 'variant'> {}
