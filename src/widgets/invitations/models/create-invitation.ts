import { sample } from 'effector';

import {
	generateInvitationLinkModel,
	inviteUserIntoRoomModel
} from '@/features/invitation';

import { searchUserModel } from '@/entities/users';

import { popupsMap } from '@/shared/configs';
import { createPopupControlModel } from '@/shared/lib';

export const popupControls = createPopupControlModel({
	name: popupsMap.createInvitation,
});

sample({
	clock: [
		inviteUserIntoRoomModel.mutation.finished.success,
		generateInvitationLinkModel.query.finished.success
	],
	target: popupControls.close,
});

sample({
	clock: popupControls.closed,
	target: [searchUserModel.query.reset, inviteUserIntoRoomModel.form.reset],
});
