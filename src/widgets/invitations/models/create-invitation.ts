import { sample } from 'effector';

import { inviteUserIntoRoomModel } from '@/features/invitation';

import { createPopupControlModel } from '@/entities/popups';
import { searchUserModel } from '@/entities/users';

import { popupsMap } from '@/shared/configs';

export const { close, $isOpen, } = createPopupControlModel(
	popupsMap.createInvitation
);

sample({
	clock: inviteUserIntoRoomModel.mutation.finished.success,
	target: close,
});

sample({
	clock: close,
	target: [searchUserModel.query.reset, inviteUserIntoRoomModel.form.reset],
});
