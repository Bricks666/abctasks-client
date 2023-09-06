import { createDomain, sample } from 'effector';

import { authModel } from '@/entities/auth';

const pageDomain = createDomain();

export const loaded = pageDomain.event();
export const loadedAndAuthSuccess = pageDomain.event();

sample({
	clock: loaded,
	filter: authModel.$isAuth,
	target: loadedAndAuthSuccess,
});
