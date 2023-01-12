import { createSnackbarStackModel } from '@/shared/lib';

export const { $items, create, $position, } = createSnackbarStackModel({
	maxCount: 5,
	timeout: 500000,
	variant: 'filled',
});
