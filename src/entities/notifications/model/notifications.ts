import { createDomain } from 'effector';
import { debug } from 'patronum';
import { createNotificationsModel } from '@/shared/lib';
import { Notification } from './types';

const notificationsDomain = createDomain();

export const $last = notificationsDomain.store<null | Notification>(null);

export const { $notifications, create, $position, } = createNotificationsModel({
	maxCount: 5,
	timeout: 50000,
});

debug($notifications, create);
