import { sample } from 'effector';
import { debounce } from 'patronum';
import { activitiesFiltersModel } from '@/features/activities';
import { activitiesModel } from '@/entities/activities';
import { routes } from '@/shared/configs';
import { loadedWithRouteState } from './page';

sample({
	clock: [routes.room.activities.opened, loadedWithRouteState],
	fn: ({ params, }) => ({ roomId: params.id, }),
	target: activitiesModel.query.start,
});

const activitiesFiltersChanges = debounce({
	source: activitiesFiltersModel.form.$values,
	timeout: 250,
}).map((form) => ({
	sphereName: form.sphereName,
	action: form.action,
	activistId: form.activist?.id,
	before: form.before,
	after: form.after,
}));

sample({
	clock: activitiesFiltersChanges,
	source: routes.room.activities.$params,
	fn: (params, form) => ({
		roomId: params.id,
		...form,
	}),
	target: activitiesModel.query.start,
});

sample({
	clock: routes.room.activities.closed,
	target: activitiesFiltersModel.form.reset,
});
