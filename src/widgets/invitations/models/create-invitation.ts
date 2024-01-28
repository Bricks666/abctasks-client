import { sample } from 'effector';

import { inviteUserIntoRoomModel } from '@/features/invitation';

import { searchUserModel } from '@/entities/users';

import { popupsMap } from '@/shared/configs';
import { createPopupControlModel } from '@/shared/lib';

export const popupControls = createPopupControlModel(
	popupsMap.createInvitation
);

sample({
	clock: inviteUserIntoRoomModel.mutation.finished.success,
	target: popupControls.close,
});

sample({
	clock: popupControls.closed,
	target: [searchUserModel.query.reset, inviteUserIntoRoomModel.form.reset],
});
