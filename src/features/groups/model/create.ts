import { update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { groupsModel } from '@/entities/groups';
import { createPopupControlModel } from '@/entities/popups';
import { CreateGroupParams, group, Group, groupsApi } from '@/shared/api';
import { popupsMap, routes } from '@/shared/configs';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import { StandardResponse, getStandardResponse } from '@/shared/types';
import { form } from './form';

const createGroupDomain = createDomain();

export const { close, $isOpen, } = createPopupControlModel(
	popupsMap.createGroup
);

const { formValidated, reset, } = form;

const handlerFx = createGroupDomain.effect<
	CreateGroupParams,
	StandardResponse<Group>,
	StandardFailError
>(groupsApi.create);

export const mutation = createMutationWithAccess<
	CreateGroupParams,
	StandardResponse<Group>,
	StandardResponse<Group>,
	StandardFailError
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(group)),
});

sample({
	clock: mutation.finished.success,
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
	target: mutation.start,
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
				result: [...query.result, mutation.result.data],
			};
		},
	},
});
