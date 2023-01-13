import { Alert, Slide } from '@mui/material';
import * as React from 'react';
import { Direction, Snackbar } from '@/shared/lib';
import { CommonProps } from '@/shared/types';

export interface SnackbarItemProps extends CommonProps, Snackbar {
	readonly onMounted: (id: number) => void;
	readonly onUnmounted: (id: number) => void;
	readonly onClose: (id: number) => void;
	readonly direction: Direction;
}

export const SnackbarItem: React.FC<SnackbarItemProps> = React.memo((props) => {
	const {
		direction,
		onMounted,
		onUnmounted,
		message,
		open,
		duration,
		id,
		onClose,
		closable,
		...rest
	} = props;

	const handleClose = React.useCallback(() => {
		onClose(id);
	}, []);
	const handleMounted = React.useCallback(() => {
		onMounted(id);
	}, []);
	const handleUnmounted = React.useCallback(() => {
		onUnmounted(id);
	}, []);

	return (
		<Slide
			in={open}
			onExited={handleUnmounted}
			onEntered={handleMounted}
			direction={direction}
			timeout={duration}
			mountOnEnter
			unmountOnExit>
			<Alert {...rest} onClose={closable ? handleClose : undefined}>
				{message}
			</Alert>
		</Slide>
	);
});
