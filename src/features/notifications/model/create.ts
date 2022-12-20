import { createDomain, sample } from 'effector';
import { Notification, notificationModel } from '@/entities/notifications';

const createNotificationDomain = createDomain();

export const setNotification = createNotificationDomain.event<Notification>();

sample({
	clock: setNotification,
	target: notificationModel.$last,
});
