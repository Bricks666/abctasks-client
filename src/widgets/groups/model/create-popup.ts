import { createDomain, sample } from 'effector';
import { createGroupModel } from '@/features/groups';
import { groupsModel } from '@/entities/groups';
import { popupsModel } from '@/entities/popups';
import { popupsMap } from '@/shared/configs';

const createGroupPopupDomain = createDomain();

export const close = createGroupPopupDomain.event();

sample({
	clock: close,
	fn: () => popupsMap.createGroup,
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
