import { createDomain, sample } from 'effector';
import { popupsModel } from '@/entities/popups';
import { popups } from '@/shared/const';

const createRoomPopupDomain = createDomain();

export const close = createRoomPopupDomain.event();

sample({
	clock: close,
	fn: () => popups.createRoom,
	target: popupsModel.close,
});
