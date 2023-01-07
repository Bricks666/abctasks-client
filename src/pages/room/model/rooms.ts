import { sample } from 'effector';
import { roomsModel } from '@/entities/rooms';
import { routes } from '@/shared/configs';
import { loadedWithRouteParams } from './page';

sample({
	clock: routes.room.closed,
	target: roomsModel.query.reset,
});

sample({
	clock: [routes.room.opened, loadedWithRouteParams],
	target: roomsModel.query.start,
});
