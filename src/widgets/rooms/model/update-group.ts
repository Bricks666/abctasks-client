import { createDomain, sample } from 'effector';
import { popupsModel } from '@/entities/popups';
import { popups } from '@/shared/const';

const updateRoomPopupDomain = createDomain();

export const close = updateRoomPopupDomain.event();

sample({
	clock: close,
	fn: () => popups.updateRoom,
	target: popupsModel.close,
});
