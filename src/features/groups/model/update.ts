import { update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { and } from 'patronum';
import { groupsModel, groupModel } from '@/entities/groups';
import { createPopupControlModel } from '@/entities/popups';
import { UpdateGroupParams, Group, groupsApi, group } from '@/shared/api';
import { popupsMap, routes } from '@/shared/configs';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import { StandardResponse, getStandardResponse } from '@/shared/types';
import { form } from './form';

const updateGroupDomain = createDomain();

const handlerFx = updateGroupDomain.effect<
	UpdateGroupParams,
	StandardResponse<Group>,
	StandardFailError
>(groupsApi.update);

export const mutation = createMutationWithAccess<
	UpdateGroupParams,
	StandardResponse<Group>,
	StandardResponse<Group>,
	StandardFailError
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(group)),
});

export const { close, $isOpen, } = createPopupControlModel(
	popupsMap.updateGroup
);

const { fields, setForm, reset, formValidated, } = form;

sample({
	clock: close,
	target: groupsModel.$id.reinit!,
});

sample({
	clock: close,
	target: reset,
});

sample({
	clock: mutation.finished.success,
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
	target: mutation.start,
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

update(groupsModel.query, {
	on: mutation,
	by: {
		success: ({ query, mutation, }) => {
			if (!query) {
				return {
					result: [],
				};
			}

			if ('error' in query) {
				return {
					error: query.error,
				};
			}

			return {
				result: query.result.map((group) =>
					group.id === mutation.result.data.id ? mutation.result.data : group
				),
			};
		},
	},
});
