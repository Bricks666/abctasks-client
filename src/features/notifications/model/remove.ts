import { createDomain, sample } from 'effector';
import { notificationModel } from '@/entities/notifications';

const removeNotificationDomain = createDomain();

export const removeNotification = removeNotificationDomain.event();

sample({
	clock: removeNotification,
	fn: () => null,
	target: notificationModel.$last,
});
