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
	target: groupsModel.$id.reinit!,
});

sample({
	clock: updateGroupModel.mutation.finished.success,
	target: close,
});
