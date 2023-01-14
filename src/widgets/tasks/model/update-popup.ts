import { sample } from 'effector';
import { and, debug } from 'patronum';
import { taskFormModel, updateTaskModel } from '@/features/tasks';
import { createPopupControlModel } from '@/entities/popups';
import { taskModel, tasksModel } from '@/entities/tasks';
import { popupsMap, routes } from '@/shared/configs';

export const { close, $isOpen, } = createPopupControlModel(popupsMap.updateTask);

const { fields, formValidated, setForm, reset, } = taskFormModel.form;

sample({
	clock: close,
	target: [tasksModel.$id.reinit!, reset],
});

sample({
	clock: updateTaskModel.mutation.finished.success,
	target: close,
});

sample({
	clock: formValidated,
	source: { id: tasksModel.$id, params: routes.room.tasks.$params, },
	filter: and($isOpen, tasksModel.$id),
	fn: ({ id, params, }, values) => {
		return { ...values, id: Number(id), roomId: params.id, };
	},
	target: updateTaskModel.mutation.start,
});

sample({
	clock: taskModel.query.finished.success,
	fn: ({ result, }) => result,
	target: setForm,
});

sample({
	clock: taskModel.query.finished.success,
	fn: () => false,
	target: [
		fields.content.$isDirty,
		fields.groupId.$isDirty,
		fields.status.$isDirty
	],
});

debug(and($isOpen, tasksModel.$id), tasksModel.$id, $isOpen);
