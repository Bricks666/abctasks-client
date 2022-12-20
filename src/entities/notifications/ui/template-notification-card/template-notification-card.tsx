import { Snackbar, Alert } from '@mui/material';
import * as React from 'react';
import { CommonProps, VoidFunction } from '@/shared/types';
import { Notification } from '../../model';

export interface TemplateNotificationCardProps
	extends CommonProps,
		Notification {
	readonly onClose: VoidFunction;
}

export const TemplateNotificationCard: React.FC<
	TemplateNotificationCardProps
> = (props) => {
	const { content, variant, className, onClose, } = props;
	return (
		<Snackbar
			className={className}
			onClose={onClose}
			autoHideDuration={1500}
			open>
			<Alert severity={variant} variant='filled' onClose={onClose}>
				{content}
			</Alert>
		</Snackbar>
	);
};
