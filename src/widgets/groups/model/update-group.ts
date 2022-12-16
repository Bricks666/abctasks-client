import { createDomain, sample } from 'effector';
import { groupsModel } from '@/entities/groups';
import { popupsModel } from '@/entities/popups';
import { popups } from '@/shared/const';

const updateGroupPopupDomain = createDomain();

export const close = updateGroupPopupDomain.event();

sample({
	clock: close,
	fn: () => popups.updateGroup,
	target: popupsModel.close,
});

sample({
	clock: close,
	target: groupsModel.$groupId.reinit!,
});
