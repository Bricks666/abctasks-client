import { createMutation, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { and } from 'patronum';

import { createPopupControlModel } from '@/entities/popups';
import { tagsModel, tagModel } from '@/entities/tags';

import { UpdateTagParams, Tag, tagsApi, tag } from '@/shared/api';
import { popupsMap, routes } from '@/shared/configs';
import { notificationsModel } from '@/shared/models';
import { StandardResponse, getStandardResponse } from '@/shared/types';

import { form } from './form';

const updateTagDomain = createDomain();

const handlerFx = updateTagDomain.effect<
	UpdateTagParams,
	StandardResponse<Tag>,
	Error
>(tagsApi.update);

export const mutation = createMutation<
	UpdateTagParams,
	StandardResponse<Tag>,
	StandardResponse<Tag>,
	Error
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(tag)),
});

export const { close, $isOpen, } = createPopupControlModel(popupsMap.updateTag);

const { fields, setForm, reset, formValidated, } = form;

sample({
	clock: close,
	target: tagsModel.$id.reinit!,
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
	source: { params: routes.room.tags.$params, id: tagsModel.$id, },
	filter: and($isOpen, tagsModel.$id),
	fn: ({ params, id, }, values) => ({
		...values,
		id: Number(id),
		roomId: params.id,
	}),
	target: mutation.start,
});

sample({
	clock: tagModel.query.finished.success,
	fn: ({ result, }) => result,
	target: setForm,
});

sample({
	clock: tagModel.query.finished.success,
	fn: () => false,
	target: [
		fields.name.$isDirty,
		fields.mainColor.$isDirty,
		fields.secondColor.$isDirty
	],
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
				result: query.result.map((tag) =>
					tag.id === mutation.result.data.id ? mutation.result.data : tag
				),
			};
		},
	},
});

sample({
	clock: mutation.finished.success,
	fn: () => ({
		message: 'Tag was update successfully',
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: mutation.finished.failure,
	fn: () => ({
		message: 'Tag was not update',
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});
