import { createDomain, sample } from 'effector';

import { sessionModel } from '@/shared/models';

const pageDomain = createDomain();

export const loaded = pageDomain.event();

export const loadedAndAuthSuccess = sample({
	clock: loaded,
	filter: sessionModel.$isAuth,
});
