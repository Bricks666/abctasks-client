import { update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { groupsModel } from '@/entities/groups';
import { UpdateGroupRequest, Group, groupsApi, group } from '@/shared/api';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardSuccessResponse
} from '@/shared/types';

const updateGroupDomain = createDomain();

export const handlerFx = updateGroupDomain.effect<
	UpdateGroupRequest,
	StandardResponse<Group>,
	StandardFailError
>('updateGroupFx');
handlerFx.use(groupsApi.update);

export const mutation = createMutationWithAccess<
	UpdateGroupRequest,
	StandardResponse<Group>,
	StandardSuccessResponse<Group>,
	StandardFailError
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardSuccessResponse(group)),
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
					refetch: true,
				};
			}

			return {
				result: query.result.map((group) =>
					group.id === mutation.result.data.id ? mutation.result.data : group
				),
				refetch: true,
			};
		},
	},
});
