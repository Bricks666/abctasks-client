import { sample } from 'effector';
import { groupsModel } from '@/entities/groups';
import { currentRoute, loadedWithRouteState } from './page';

sample({
	clock: [currentRoute.opened, currentRoute.updated, loadedWithRouteState],
	fn: ({ params, }) => params.id,
	target: groupsModel.query.start,
});
