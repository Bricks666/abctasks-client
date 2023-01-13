import { createSnackbarStackModel } from '@/shared/lib';

export const notifications = createSnackbarStackModel({
	maxCount: 5,
	timeout: 2000,
	variant: 'filled',
	closable: true,
});

export const { $items, create, $position, } = notifications;
