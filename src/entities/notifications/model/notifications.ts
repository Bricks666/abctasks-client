import { createSnackbarStackModel } from '@/shared/lib';

export const notifications = createSnackbarStackModel({
	maxCount: 3,
	timeout: 3000,
	variant: 'filled',
	closable: true,
});

export const { $items, create, } = notifications;
