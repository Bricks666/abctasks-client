import { createMutation, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, createEvent, createStore, sample } from 'effector';
import { Literal } from 'runtypes';

import { tagsModel } from '@/entities/tags';

import { RemoveTagParams, tagsApi } from '@/shared/api';
import { i18n, popupsMap, routes } from '@/shared/configs';
import { createPopupControlModel } from '@/shared/lib';
import { notificationsModel } from '@/shared/models';
import { StandardResponse, getStandardResponse } from '@/shared/types';

const removeTagDomain = createDomain();

const handlerFx = removeTagDomain.effect<
	RemoveTagParams,
	StandardResponse<boolean>,
	Error
>(tagsApi.remove);

const $id = createStore<number | null>(null);

export const popupControls = createPopupControlModel({
	name: popupsMap.removeTag,
	sync: false,
});

export const openConfirm = createEvent<number>();
export const remove = createEvent();

export const mutation = createMutation<
	RemoveTagParams,
	StandardResponse<boolean>,
	StandardResponse<boolean>,
	Error
>({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(Literal(true))),
});

sample({
	clock: openConfirm,
	target: [popupControls.open, $id],
});

sample({
	clock: remove,
	source: {
		id: $id,
		roomId: routes.room.tags.$params.map((params) => params.id),
	},
	filter: ({ id, roomId, }) => !!id && !!roomId,
	fn: ({ roomId, id, }) => {
		return {
			roomId,
			id,
		} as RemoveTagParams;
	},
	target: mutation.start,
});

sample({
	clock: popupControls.closed,
	target: $id.reinit!,
});

sample({
	clock: mutation.finished.finally,
	target: popupControls.close,
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
		message: i18n.t('actions.remove_tag.notifications.success', {
			ns: 'room-tags',
		}),
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: mutation.finished.failure,
	fn: () => ({
		message: i18n.t('actions.remove_tag.notifications.error', {
			ns: 'room-tags',
		}),
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});
