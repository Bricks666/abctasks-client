import { update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { createPopupControlModel } from '@/entities/popups';
import { tagsModel } from '@/entities/tags';
import { CreateTagParams, tag, Tag, tagsApi } from '@/shared/api';
import { popupsMap, routes } from '@/shared/configs';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import { StandardResponse, getStandardResponse } from '@/shared/types';
import { form } from './form';

const createTagDomain = createDomain();

export const { close, $isOpen, } = createPopupControlModel(popupsMap.createTag);

const { formValidated, reset, } = form;

const handlerFx = createTagDomain.effect<
	CreateTagParams,
	StandardResponse<Tag>,
	StandardFailError
>(tagsApi.create);

export const mutation = createMutationWithAccess<
	CreateTagParams,
	StandardResponse<Tag>,
	StandardResponse<Tag>,
	StandardFailError
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(tag)),
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
	source: routes.room.tags.$params,
	filter: $isOpen,
	fn: (params, values) => ({ ...values, roomId: params.id, }),
	target: mutation.start,
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
				result: [...query.result, mutation.result.data],
			};
		},
	},
});