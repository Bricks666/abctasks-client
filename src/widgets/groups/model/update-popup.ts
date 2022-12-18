import { createDomain, sample } from 'effector';
import { updateGroupModel } from '@/features/groups';
import { groupsModel } from '@/entities/groups';
import { popupsModel } from '@/entities/popups';
import { popups } from '@/shared/configs';

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

sample({
	clock: updateGroupModel.updateGroupMutation.finished.success,
	target: close,
});
