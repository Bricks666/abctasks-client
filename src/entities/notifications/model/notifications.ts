import { createDomain } from 'effector';
import { Notification } from './types';

const notificationsDomain = createDomain();

export const $last = notificationsDomain.store<null | Notification>(null);
