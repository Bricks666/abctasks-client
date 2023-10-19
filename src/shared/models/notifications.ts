import { createSnackbarStackModel } from 'effector-mui-snacks';

export const notifications = createSnackbarStackModel({
	maxCount: 3,
	timeout: 3000,
	variant: 'filled',
	closable: true,
	position: {
		horizontal: 'left',
		vertical: 'bottom',
	},
});

export const { $items, create, } = notifications;
