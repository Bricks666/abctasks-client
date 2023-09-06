import { sample } from 'effector';

import { registrationModel } from '@/features/auth';

import { routes } from '@/shared/configs';
import { sessionModel } from '@/shared/models';

export const currentRoute = routes.registration.base;
export const anonymousRoute = sessionModel.chainAnonymous(currentRoute, {
	otherwise: routes.rooms.open,
});

sample({
	clock: anonymousRoute.closed,
	target: registrationModel.form.reset,
});
