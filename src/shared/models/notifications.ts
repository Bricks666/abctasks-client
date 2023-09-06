import { createSnackbarStackModel } from 'effector-mui-snacks';

export const notifications = createSnackbarStackModel({
	maxCount: 3,
	timeout: 3000,
	variant: 'filled',
	closable: true,
});

export const { $items, create, } = notifications;
