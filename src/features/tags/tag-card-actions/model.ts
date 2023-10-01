import { createMutation, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { Literal } from 'runtypes';

import { tagsModel } from '@/entities/tags';

import { RemoveTagParams, tagsApi } from '@/shared/api';
import { notificationsModel } from '@/shared/models';
import { StandardResponse, getStandardResponse } from '@/shared/types';

const removeTagDomain = createDomain();

const handlerFx = removeTagDomain.effect<
	RemoveTagParams,
	StandardResponse<boolean>,
	Error
>(tagsApi.remove);

export const mutation = createMutation<
	RemoveTagParams,
	StandardResponse<boolean>,
	StandardResponse<boolean>,
	Error
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

sample({
	clock: mutation.finished.success,
	fn: () => ({
		message: 'Tag was removed successfully',
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: mutation.finished.failure,
	fn: () => ({
		message: 'Tag was not removed',
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});