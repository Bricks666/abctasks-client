import { createDomain, sample } from 'effector';

import { authModel } from '@/entities/auth';

const pageDomain = createDomain();

export const loaded = pageDomain.event();

export const loadedAndAuthSuccess = sample({
	clock: loaded,
	filter: authModel.$isAuth,
});
