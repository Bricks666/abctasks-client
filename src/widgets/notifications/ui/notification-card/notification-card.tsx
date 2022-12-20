import { useUnit } from 'effector-react';
import * as React from 'react';
import { removeNotificationModel } from '@/features/notifications';
import {
	TemplateNotificationCard,
	TemplateNotificationCardProps
} from '@/entities/notifications';

export interface NotificationCardProps
	extends Omit<TemplateNotificationCardProps, 'onClose'> {}

export const NotificationCard: React.FC<NotificationCardProps> = (props) => {
	const onClose = useUnit(removeNotificationModel.removeNotification);
	return <TemplateNotificationCard {...props} onClose={onClose} />;
};
