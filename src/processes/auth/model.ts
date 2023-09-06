import { redirect } from 'atomic-router';
import { sample } from 'effector';
import { not } from 'patronum';

import { logoutModel, registrationModel } from '@/features/auth';

import { authModel } from '@/entities/auth';
import { pageModel } from '@/entities/page';

import { routes } from '@/shared/configs';

redirect({
	clock: [authModel.query.finished.failure],
	route: routes.login,
});

redirect({
	clock: logoutModel.logoutMutation.finished.success,
	route: routes.login,
});

sample({
	clock: pageModel.started,
	target: authModel.query.start,
});

redirect({
	clock: registrationModel.mutation.finished.success,
	route: routes.registration.tanks,
});

sample({
	clock: routes.registration.tanks.opened,
	filter: not(registrationModel.mutation.$succeeded),
	fn: () => ({ params: {}, query: {}, replace: true, }),
	target: routes.registration.base.navigate,
});

sample({
	clock: routes.registration.tanks.closed,
	target: [registrationModel.form.reset],
});
