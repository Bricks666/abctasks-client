import { createDomain, sample } from 'effector';
import { addUserRoomModel } from '@/features/rooms';
import { popupsModel } from '@/entities/popups';
import { searchedUsersModel } from '@/entities/users';
import { popups } from '@/shared/configs';

const addUsersPopupDomain = createDomain();

export const close = addUsersPopupDomain.event();

sample({
	clock: close,
	fn: () => popups.addUser,
	target: popupsModel.close,
});

sample({
	clock: addUserRoomModel.mutation.finished.success,
	target: close,
});

sample({
	clock: close,
	target: searchedUsersModel.query.reset,
});
