import { sample } from 'effector';

import { loginModel } from '@/features/auth';

import { routes } from '@/shared/configs';
import { sessionModel } from '@/shared/models';

export const currentRoute = routes.login;
export const anonymousRoute = sessionModel.chainAnonymous(currentRoute, {
	otherwise: routes.rooms.open,
});

sample({
	clock: anonymousRoute.closed,
	target: loginModel.form.reset,
});
