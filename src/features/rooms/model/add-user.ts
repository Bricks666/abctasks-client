import { runtypeContract } from '@farfetched/runtypes';
import { createDomain, sample } from 'effector';
import { createForm } from 'effector-forms';
import { createPopupControlModel } from '@/entities/popups';
import { searchUserModel } from '@/entities/users';
import { AddUserRoomParams, roomsApi, user, User } from '@/shared/api';
import { popupsMap, routes } from '@/shared/configs';
import { createMutationWithAccess, StandardFailError } from '@/shared/lib';
import { StandardResponse, getStandardResponse } from '@/shared/types';

const addUserRoomDomain = createDomain();

export const { close, $isOpen, } = createPopupControlModel(popupsMap.addUser);
const handlerFx = addUserRoomDomain.effect<
	AddUserRoomParams,
	StandardResponse<User>,
	StandardFailError
>(roomsApi.addUser);

export const mutation = createMutationWithAccess({
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
	fn: (params, values) => ({ userId: values.user!.id, id: params.id, }),
	target: mutation.start,
});
