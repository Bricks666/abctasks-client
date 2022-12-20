import { createDomain, sample } from 'effector';
import { createRoomModel } from '@/features/rooms';
import { popupsModel } from '@/entities/popups';
import { popups } from '@/shared/configs';

const createRoomPopupDomain = createDomain();

export const close = createRoomPopupDomain.event();

sample({
	clock: close,
	fn: () => popups.createRoom,
	target: popupsModel.close,
});

sample({
	clock: createRoomModel.mutation.finished.success,
	target: close,
});
