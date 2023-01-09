import { update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { groupsModel } from '@/entities/groups';
import { CreateGroupParams, group, Group, groupsApi } from '@/shared/api';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import {
	StandardResponse,
	StandardSuccessResponse,
	getStandardResponse
} from '@/shared/types';

const createGroupDomain = createDomain();

const handlerFx = createGroupDomain.effect<
	CreateGroupParams,
	StandardResponse<Group>,
	StandardFailError
>('createGroupFx');
handlerFx.use(groupsApi.create);

export const mutation = createMutationWithAccess<
	CreateGroupParams,
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
				result: [...query.result, mutation.result.data],
			};
		},
	},
});
