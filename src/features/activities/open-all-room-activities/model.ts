import { createEvent, sample } from 'effector';

import { routes } from '@/shared/configs';

export const openAllActivities = createEvent();

sample({
	clock: openAllActivities,
	source: routes.room.base.$query,
	fn: (query) => {
		return {
			id: query.id,
		};
	},
	target: routes.room.activities.open,
});
