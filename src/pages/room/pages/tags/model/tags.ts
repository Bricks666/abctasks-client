import { sample } from 'effector';

import {
	createTagModel,
	removeTagModel,
	updateTagModel
} from '@/features/tags';

import { notificationsModel } from '@/entities/notifications';
import { tagsModel } from '@/entities/tags';

import { routes } from '@/shared/configs';

import { loadedWithRouteState } from './page';

sample({
	clock: createTagModel.mutation.finished.success,
	fn: () => ({
		message: 'Tag was created successfully',
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: createTagModel.mutation.finished.failure,
	fn: () => ({
		message: 'Tag was not created',
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: removeTagModel.mutation.finished.success,
	fn: () => ({
		message: 'Tag was removed successfully',
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: removeTagModel.mutation.finished.failure,
	fn: () => ({
		message: 'Tag was not removed',
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: updateTagModel.mutation.finished.success,
	fn: () => ({
		message: 'Tag was update successfully',
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: updateTagModel.mutation.finished.failure,
	fn: () => ({
		message: 'Tag was not update',
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: [routes.room.tags.opened, loadedWithRouteState],
	fn: ({ params, }) => params.id,
	target: tagsModel.query.start,
});
