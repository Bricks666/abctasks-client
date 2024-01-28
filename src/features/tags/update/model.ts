import { createMutation, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createEffect, sample } from 'effector';
import { and, not } from 'patronum';

import { tagsModel, tagModel } from '@/entities/tags';

import { UpdateTagParams, Tag, tagsApi, tag, GetTagParams } from '@/shared/api';
import { getParams, i18n, popupsMap, routes } from '@/shared/configs';
import { createPopupControlModel, createQueryModel } from '@/shared/lib';
import { notificationsModel } from '@/shared/models';
import { StandardResponse, getStandardResponse } from '@/shared/types';

import { tagFormModel } from '../form';

const handlerFx = createEffect(tagsApi.update);

export const mutation = createMutation<
	UpdateTagParams,
	StandardResponse<Tag>,
	StandardResponse<Tag>,
	Error
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(tag)),
});

export const popupControls = createPopupControlModel(popupsMap.updateTag);
export const $roomId = routes.room.tags.$params.map((params) => params.id);
export const form = tagFormModel.create();
export const tagId = createQueryModel<number | null>({
	name: getParams.tagId,
	defaultValue: null,
});

const { fields, setForm, reset, formValidated, } = form;

sample({
	clock: popupControls.closed,
	target: [tagId.reset, reset],
});

sample({
	clock: mutation.finished.success,
	target: popupControls.close,
});

sample({
	clock: popupControls.opened,
	source: {
		roomId: $roomId,
		id: tagId.$value,
	},
	filter: ({ id, }) => {
		return !!id;
	},
	fn: ({ id, roomId, }) => {
		return {
			id,
			roomId,
		} as GetTagParams;
	},
	target: tagModel.query.start,
});

sample({
	clock: formValidated,
	source: { params: routes.room.tags.$params, id: tagId.$value, },
	filter: and(popupControls.$isOpen, not(tagId.$isEmpty)),
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
		message: i18n.t('actions.update_tag.notifications.success', {
			ns: 'room-tags',
		}),
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: mutation.finished.failure,
	fn: () => ({
		message: i18n.t('actions.update_tag.notifications.error', {
			ns: 'room-tags',
		}),
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});
