import { sample } from 'effector';
import { and } from 'patronum';
import { groupFormModel, updateGroupModel } from '@/features/groups';
import { groupModel, groupsModel } from '@/entities/groups';
import { createPopupControlModel } from '@/entities/popups';
import { popupsMap, routes } from '@/shared/configs';

export const { close, $isOpen, } = createPopupControlModel(
	popupsMap.updateGroup
);

const { fields, setForm, reset, formValidated, } = groupFormModel.form;

sample({
	clock: close,
	target: groupsModel.$id.reinit!,
});

sample({
	clock: close,
	target: reset,
});

sample({
	clock: updateGroupModel.mutation.finished.success,
	target: close,
});

sample({
	clock: formValidated,
	source: { params: routes.room.groups.$params, id: groupsModel.$id, },
	filter: and($isOpen, groupsModel.$id),
	fn: ({ params, id, }, values) => ({
		...values,
		id: Number(id),
		roomId: params.id,
	}),
	target: updateGroupModel.mutation.start,
});

sample({
	clock: groupModel.query.finished.success,
	fn: ({ result, }) => result,
	target: setForm,
});

sample({
	clock: groupModel.query.finished.success,
	fn: () => false,
	target: [
		fields.name.$isDirty,
		fields.mainColor.$isDirty,
		fields.secondColor.$isDirty
	],
});
