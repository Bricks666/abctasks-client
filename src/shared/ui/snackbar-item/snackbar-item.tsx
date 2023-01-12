/* eslint-disable @typescript-eslint/no-unused-vars */
import { Alert, Slide } from '@mui/material';
import * as React from 'react';
import { Snackbar } from '@/shared/lib';
import { CommonProps } from '@/shared/types';

export interface SnackbarItemProps extends CommonProps, Snackbar {}

export const SnackbarItem: React.FC<SnackbarItemProps> = (props) => {
	const {
		direction,
		onMounted,
		onUnmounted,
		message,
		open,
		duration,
		id: _,
		...rest
	} = props;
	return (
		<Slide
			in={open}
			onExited={onUnmounted}
			onEntered={onMounted}
			direction={direction}
			timeout={duration}
			mountOnEnter
			unmountOnExit>
			<Alert {...rest}>{message}</Alert>
		</Slide>
	);
};
