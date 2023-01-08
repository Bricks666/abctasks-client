import { createDomain, sample } from 'effector';
import { updateRoomModel } from '@/features/rooms';
import { popupsModel } from '@/entities/popups';
import { roomsModel } from '@/entities/rooms';
import { popups } from '@/shared/configs';

const updateRoomPopupDomain = createDomain();

export const close = updateRoomPopupDomain.event();

sample({
	clock: close,
	fn: () => popups.updateRoom,
	target: popupsModel.close,
});

sample({
	clock: close,
	target: roomsModel.$id.reinit!,
});

sample({
	clock: updateRoomModel.mutation.finished.success,
	target: close,
});
