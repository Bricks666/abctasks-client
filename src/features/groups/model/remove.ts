import { update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { Literal } from 'runtypes';
import { groupsModel } from '@/entities/groups';
import { RemoveGroupParams, groupsApi } from '@/shared/api';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import { StandardResponse, getStandardResponse } from '@/shared/types';

const removeGroupDomain = createDomain();

const handlerFx = removeGroupDomain.effect<
	RemoveGroupParams,
	StandardResponse<boolean>,
	StandardFailError
>(groupsApi.remove);

export const mutation = createMutationWithAccess<
	RemoveGroupParams,
	StandardResponse<boolean>,
	StandardResponse<boolean>,
	StandardFailError
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Literal(true))),
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
				result: query.result.filter((group) => group.id !== mutation.params.id),
			};
		},
	},
});
