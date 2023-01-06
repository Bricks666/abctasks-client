import { sample } from 'effector';
import { usersInRoomModel } from '@/entities/users/model';
import { routes } from '@/shared/configs';
import { loadedWithRouteParams } from './page';

sample({
	clock: [routes.room.opened, loadedWithRouteParams],
	fn: ({ params, }) => ({ roomId: params.id, }),
	target: usersInRoomModel.query.start,
});
