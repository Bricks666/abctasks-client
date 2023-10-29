import { redirect } from 'atomic-router';
import { sample } from 'effector';

import { registrationModel } from '@/features/auth';

import { routes } from '@/shared/configs';
import { internalRoutingModel, sessionModel } from '@/shared/models';

export const currentRoute = routes.registration.base;
export const anonymousRoute = sessionModel.chainAnonymous(currentRoute, {
	otherwise: routes.rooms.open,
});

sample({
	clock: anonymousRoute.closed,
	target: registrationModel.form.reset,
});

sample({
	clock: registrationModel.mutation.finished.success,
	target: internalRoutingModel.$internalRoute.enable,
});

redirect({
	clock: registrationModel.mutation.finished.success,
	query: ({ params, }) => {
		return {
			email: params.email,
			username: params.username,
		};
	},
	route: routes.registration.thanks,
});
