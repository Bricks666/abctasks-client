import { createMutation, update } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, createEvent, sample } from 'effector';
import { not } from 'patronum';
import { Literal } from 'runtypes';

import { tagsModel } from '@/entities/tags';

import { RemoveTagParams, tagsApi } from '@/shared/api';
import { getParams, i18n, popupsMap } from '@/shared/configs';
import { createPopupControlModel, createQueryModel } from '@/shared/lib';
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
export const tagId = createQueryModel<number | null>({
	name: getParams.tagId,
	defaultValue: null,
});
export const openPopup = createEvent<number>();

sample({
	clock: openPopup,
	target: open,
});

sample({
	clock: openPopup,
	target: tagId.set,
});

sample({
	clock: not($isOpen),
	filter: Boolean,
	target: tagId.reset!,
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
