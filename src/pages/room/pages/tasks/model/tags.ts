import { sample } from 'effector';
import { tagsModel } from '@/entities/tags';
import { currentRoute, loadedWithRouteState } from './page';

sample({
	clock: [currentRoute.opened, currentRoute.updated, loadedWithRouteState],
	fn: ({ params, }) => params.id,
	target: tagsModel.query.start,
});
