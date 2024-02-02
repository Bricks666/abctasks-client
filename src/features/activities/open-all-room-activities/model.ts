import { createEvent, sample } from 'effector';

import { routes } from '@/shared/configs';

export const openAllActivities = createEvent();

sample({
	clock: openAllActivities,
	source: routes.room.base.$params,
	fn: (params) => {
		return {
			id: params.id,
		};
	},
	target: routes.room.activities.open,
});
