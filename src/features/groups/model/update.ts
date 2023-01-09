import { update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { groupsModel } from '@/entities/groups';
import { UpdateGroupParams, Group, groupsApi, group } from '@/shared/api';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardResponse
} from '@/shared/types';

const updateGroupDomain = createDomain();

const handlerFx = updateGroupDomain.effect<
	UpdateGroupParams,
	StandardResponse<Group>,
	StandardFailError
>('updateGroupFx');
handlerFx.use(groupsApi.update);

export const mutation = createMutationWithAccess<
	UpdateGroupParams,
	StandardResponse<Group>,
	StandardSuccessResponse<Group>,
	StandardFailError
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(group)),
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
