import { sample } from 'effector';
import { debounce } from 'patronum';
import { activitiesFiltersModel } from '@/features/activities';
import {
	createGroupModel,
	removeGroupModel,
	updateGroupModel
} from '@/features/groups';
import {
	createTaskModel,
	removeTaskModel,
	updateTaskModel
} from '@/features/tasks';
import { activitiesModel } from '@/entities/activities';
import { routes } from '@/shared/configs';
import { loadedWithRouteParams } from './page';

sample({
	clock: [
		createTaskModel.mutation.finished.success,
		removeTaskModel.mutation.finished.success,
		updateTaskModel.mutation.finished.success,
		createGroupModel.mutation.finished.success,
		removeGroupModel.mutation.finished.success,
		updateGroupModel.mutation.finished.success
	],
	fn: ({ params, }) => ({ roomId: params.roomId, }),
	target: [activitiesModel.query.start],
});

sample({
	clock: routes.room.closed,
	target: activitiesModel.query.reset,
});

sample({
	clock: [routes.room.opened, loadedWithRouteParams],
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
	source: routes.room.$params,
	fn: (params, form) => ({
		roomId: params.id,
		...form,
	}),
	target: activitiesModel.query.start,
});

sample({
	clock: routes.room.updated,
	filter: ({ params, }) => params.tab !== 'activities',
	target: activitiesFiltersModel.form.reset,
});
