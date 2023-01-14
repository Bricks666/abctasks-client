import { sample } from 'effector';
import { roomFormModel, updateRoomModel } from '@/features/rooms';
import { createPopupControlModel } from '@/entities/popups';
import { roomModel, roomsModel } from '@/entities/rooms';
import { popupsMap } from '@/shared/configs';

export const { close, $isOpen, } = createPopupControlModel(popupsMap.updateRoom);

sample({
	clock: close,
	target: roomsModel.$id.reinit!,
});

sample({
	clock: close,
	target: roomFormModel.form.reset,
});

sample({
	clock: updateRoomModel.mutation.finished.success,
	target: close,
});

sample({
	clock: roomFormModel.form.formValidated,
	source: roomsModel.$id,
	filter: $isOpen,
	fn: (roomId, values) => {
		return { ...values, id: Number(roomId), };
	},
	target: updateRoomModel.mutation.start,
});

sample({
	clock: roomModel.query.finished.success,
	fn: ({ result, }) => result,
	target: roomFormModel.form.setForm,
});

sample({
	clock: roomModel.query.finished.success,
	fn: () => false,
	target: [
		roomFormModel.form.fields.description.$isDirty,
		roomFormModel.form.fields.name.$isDirty
	],
});
