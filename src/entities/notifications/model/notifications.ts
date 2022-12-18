import { createDomain } from 'effector';
import { Notification } from './types';

const notificationsDomain = createDomain();

export const $lastNotification = notificationsDomain.store<null | Notification>(
	null
);
