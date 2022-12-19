import { createDomain, sample } from 'effector';
import { createGroupModel } from '@/features/groups';
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
	target: groupsModel.$id.reinit!,
});

sample({
	clock: createGroupModel.mutation.finished.success,
	target: close,
});
