import { createDomain, sample } from 'effector';
import { groupsModel } from '@/entities/groups';
import { popupsModel } from '@/entities/popups';
import { popups } from '@/shared/configs';

const createGroupPopupDomain = createDomain();

export const close = createGroupPopupDomain.event();

sample({
	clock: close,
	fn: () => popups.createGroup,
	target: popupsModel.close,
});

sample({
	clock: close,
	target: groupsModel.$groupId.reinit!,
});
