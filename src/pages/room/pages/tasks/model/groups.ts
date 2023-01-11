import { sample } from 'effector';
import { groupsModel } from '@/entities/groups';
import { routes } from '@/shared/configs';
import { loadedWithRouteState } from './page';

sample({
	clock: [routes.room.tasks.opened, loadedWithRouteState],
	fn: ({ params, }) => params.id,
	target: groupsModel.query.start,
});
