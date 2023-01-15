import { sample } from 'effector';
import { usersInRoomModel } from '@/entities/users';
import { routes } from '@/shared/configs';
import { loadedWithRouteState } from './page';

sample({
	clock: [routes.room.base.opened, loadedWithRouteState],
	fn: ({ params, }) => ({ roomId: params.id, }),
	target: usersInRoomModel.query.start,
});
