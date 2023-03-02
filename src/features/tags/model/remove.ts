import { update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain } from 'effector';
import { Literal } from 'runtypes';
import { tagsModel } from '@/entities/tags';
import { RemoveTagParams, tagsApi } from '@/shared/api';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import { StandardResponse, getStandardResponse } from '@/shared/types';

const removeTagDomain = createDomain();

const handlerFx = removeTagDomain.effect<
	RemoveTagParams,
	StandardResponse<boolean>,
	StandardFailError
>(tagsApi.remove);

export const mutation = createMutationWithAccess<
	RemoveTagParams,
	StandardResponse<boolean>,
	StandardResponse<boolean>,
	StandardFailError
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Literal(true))),
});

update(tagsModel.query, {
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
				result: query.result.filter((tag) => tag.id !== mutation.params.id),
			};
		},
	},
});
