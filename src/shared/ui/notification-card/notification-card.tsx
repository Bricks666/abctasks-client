import { Alert, Slide } from '@mui/material';
import * as React from 'react';
import { Notification } from '@/shared/lib';
import { CommonProps } from '@/shared/types';

export interface NotificationCardProps extends CommonProps, Notification {}

export const NotificationCard: React.FC<NotificationCardProps> = (props) => {
	const {
		slideDirection,
		onMounted,
		onUnmounted,
		message,
		open,
		duration,
		...rest
	} = props;
	return (
		<Slide
			in={open}
			onExited={onUnmounted}
			onEntered={onMounted}
			direction={slideDirection}
			timeout={duration}
			mountOnEnter
			unmountOnExit>
			<Alert {...rest}>{message}</Alert>
		</Slide>
	);
};
