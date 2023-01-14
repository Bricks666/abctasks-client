import { sample } from 'effector';
import { debounce } from 'patronum';
import {
	createTaskModel,
	removeTaskModel,
	tasksFiltersModel,
	updateTaskModel
} from '@/features/tasks';
import { notificationsModel } from '@/entities/notifications';
import { tasksInRoomModel } from '@/entities/tasks';
import { routes } from '@/shared/configs';
import { loadedWithRouteState } from './page';

const { $values, } = tasksFiltersModel.form;
const currentRoute = routes.room.tasks;
/**
 * TODO: Вынести в модель уведомлений
 */
sample({
	clock: createTaskModel.mutation.finished.success,
	fn: () => ({
		message: 'Task was created successfully',
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: createTaskModel.mutation.finished.failure,
	fn: () => ({
		message: 'Task was not created',
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: removeTaskModel.mutation.finished.success,
	fn: () => ({
		message: 'Task was removed successfully',
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: removeTaskModel.mutation.finished.failure,
	fn: () => ({
		message: 'Task was not removed',
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: updateTaskModel.mutation.finished.success,
	fn: () => ({
		message: 'Task was update successfully',
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: updateTaskModel.mutation.finished.failure,
	fn: () => ({
		message: 'Task was not update',
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: [currentRoute.opened, loadedWithRouteState],
	fn: ({ params, }) => ({ roomId: params.id, }),
	target: tasksInRoomModel.query.start,
});

const valuesChanged = debounce({
	source: $values,
	timeout: 250,
});

sample({
	clock: valuesChanged,
	source: currentRoute.$params,
	fn: ({ id, }, values) => ({ roomId: id, ...values, }),
	target: tasksInRoomModel.query.start,
});
