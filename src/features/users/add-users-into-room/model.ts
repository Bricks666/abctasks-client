import { createMutation } from '@farfetched/core';
import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { createForm } from 'effector-forms';

import { createPopupControlModel } from '@/entities/popups';
import { searchUserModel } from '@/entities/users';

import { AddUserRoomParams, membersApi, user, User } from '@/shared/api';
import { popupsMap, routes } from '@/shared/configs';
import { i18nModel, notificationsModel } from '@/shared/models';
import { StandardResponse, getStandardResponse } from '@/shared/types';

const addUserRoomDomain = createDomain();

export const { close, $isOpen, } = createPopupControlModel(popupsMap.addUser);
const handlerFx = addUserRoomDomain.effect<
	AddUserRoomParams,
	StandardResponse<User>,
	Error
>(membersApi.invite);
export const mutation = createMutation({
	effect: handlerFx,
	contract: runtypeContract(getStandardResponse(user)),
});

interface AddUserFormValues {
	readonly user: User | null;
}

export const form = createForm<AddUserFormValues>({
	fields: {
		user: {
			init: null,
		},
	},
	domain: addUserRoomDomain,
});

sample({
	clock: mutation.finished.success,
	target: close,
});

sample({
	clock: close,
	target: [searchUserModel.query.reset, form.reset],
});

sample({
	clock: form.formValidated,
	source: routes.room.users.$params,
	filter: (_, values) => Boolean(values.user),
	fn: (params, values) => ({ userId: values.user!.id, roomId: params.id, }),
	target: mutation.start,
});

sample({
	clock: mutation.finished.success,
	source: i18nModel.integration.$t,
	fn: (t) => ({
		message: t('action.add_user.notifications.success', { ns: 'room-users', }),
		color: 'success' as const,
	}),
	target: notificationsModel.create,
});

sample({
	clock: mutation.finished.failure,
	source: i18nModel.integration.$t,
	fn: (t) => ({
		message: t('action.add_user.notifications.error', { ns: 'room-users', }),
		color: 'error' as const,
	}),
	target: notificationsModel.create,
});
