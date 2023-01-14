import { sample } from 'effector';
import { createGroupModel, groupFormModel } from '@/features/groups';
import { createPopupControlModel } from '@/entities/popups';
import { popupsMap, routes } from '@/shared/configs';

export const { close, $isOpen, } = createPopupControlModel(
	popupsMap.createGroup
);

const { formValidated, reset, } = groupFormModel.form;

sample({
	clock: createGroupModel.mutation.finished.success,
	target: close,
});

sample({
	clock: close,
	target: reset,
});

sample({
	clock: formValidated,
	source: routes.room.groups.$params,
	filter: $isOpen,
	fn: (params, values) => ({ ...values, roomId: params.id, }),
	target: createGroupModel.mutation.start,
});
