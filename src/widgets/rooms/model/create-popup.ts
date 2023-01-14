import { sample } from 'effector';
import { createRoomModel, roomFormModel } from '@/features/rooms';
import { createPopupControlModel, popupsModel } from '@/entities/popups';
import { popupsMap } from '@/shared/configs';

export const { close, $isOpen, } = createPopupControlModel(popupsMap.createRoom);

sample({
	clock: close,
	fn: () => popupsMap.createRoom,
	target: popupsModel.close,
});

sample({
	clock: close,
	target: roomFormModel.form.reset,
});

sample({
	clock: createRoomModel.mutation.finished.success,
	target: close,
});

sample({
	clock: roomFormModel.form.formValidated,
	source: roomFormModel.form.$values,
	filter: $isOpen,
	target: createRoomModel.mutation.start,
});
