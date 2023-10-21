import { createMutation, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createEffect, sample } from 'effector';

import { createPopupControlModel } from '@/entities/popups';
import { tagsModel } from '@/entities/tags';

import { CreateTagParams, tag, Tag, tagsApi } from '@/shared/api';
import { popupsMap, routes } from '@/shared/configs';
import { i18nModel, notificationsModel } from '@/shared/models';
import { StandardResponse, getStandardResponse } from '@/shared/types';

import { tagFormModel } from '../form';

export const { close, $isOpen, } = createPopupControlModel(popupsMap.createTag);

export const form = tagFormModel.create();

const { formValidated, reset, } = form;

const handlerFx = createEffect(tagsApi.create);

export const mutation = createMutation<
	CreateTagParams,
	StandardResponse<Tag>,
	StandardResponse<Tag>,
	Error
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

sample({
	clock: mutation.finished.success,
	source: i18nModel.integration.$t,
	fn: (t) => ({
		message: t('action.create_tag.notifications.success', { ns: 'room-tags', }),
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: mutation.finished.failure,
	source: i18nModel.integration.$t,
	fn: (t) => ({
		message: t('action.create_tag.notifications.success', { ns: 'room-tags', }),
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});
