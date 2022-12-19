import { sample } from 'effector';
import { roomModel } from '@/entities/rooms';
import { routes } from '@/shared/configs';

sample({
	clock: routes.room.closed,
	target: roomModel.query.reset,
});
