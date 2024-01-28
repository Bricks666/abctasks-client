import { createMutation, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { querySync } from 'atomic-router';
import { createDomain, createEvent, createStore, sample } from 'effector';
import { not } from 'patronum';
import { Literal } from 'runtypes';

import { createPopupControlModel } from '@/entities/popups';
import { tagsModel } from '@/entities/tags';

import { RemoveTagParams, tagsApi } from '@/shared/api';
import { controls, getParams, i18n, popupsMap } from '@/shared/configs';
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

const { open, $isOpen, } = createPopupControlModel(popupsMap.updateTag);
export const $tagId = createStore<number | null>(null);
export const openPopup = createEvent<number>();

sample({
	clock: openPopup,
	target: open,
});

sample({
	clock: openPopup,
	target: $tagId,
});

sample({
	clock: not($isOpen),
	filter: Boolean,
	target: $tagId.reinit!,
});

querySync({
	controls,
	source: {
		[getParams.tagId]: $tagId,
	},
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
