import { cache, createQuery } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createEffect, createEvent, sample } from 'effector';
import { createForm } from 'effector-forms';
import { createGate } from 'effector-react';
import { String } from 'runtypes';

import { invitationsApi } from '@/shared/api';
import { i18n } from '@/shared/configs';
import { notificationsModel } from '@/shared/models';
import { InRoomParams, getStandardResponse } from '@/shared/types';

const handlerFx = createEffect(invitationsApi.generateLink);

export const query = createQuery({
	initialData: null,
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(String)),
	mapData: ({ result, }) => result.data,
});

export interface FormOptions {
	readonly link: string;
}

export const form = createForm<FormOptions>({
	fields: {
		link: {
			init: '',
		},
	},
});

const copyLinkFx = createEffect((link: string) => {
	return navigator.clipboard.writeText(link);
});

export const copyLink = createEvent();

export const Gate = createGate<InRoomParams>();

sample({
	clock: Gate.open,
	target: query.start,
});

sample({
	clock: copyLink,
	source: query.$data,
	filter: Boolean,
	target: copyLinkFx,
});

sample({
	clock: copyLinkFx.done,
	fn: () => ({
		message: i18n.t('actions.generate_link.notifications.success', {
			ns: 'room-users',
		}),
		color: 'info' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: query.$data,
	filter: Boolean,
	fn: (link) => ({ link, }),
	target: form.setInitialForm,
});

cache(query);
