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

sample({
	clock: debounce({
		source: activitiesFiltersModel.form.$values,
		timeout: 250,
	}),
	source: routes.room.$params,
	fn: (params, data) => ({
		roomId: params.id,
		sphereName: data.sphereName,
		action: data.action,
		activistId: data.activist?.id,
		before: data.before,
		after: data.after,
	}),
	target: activitiesModel.query.start,
});

sample({
	clock: routes.room.updated,
	filter: ({ params, }) => params.tab !== 'activities',
	target: activitiesFiltersModel.form.reset,
});
