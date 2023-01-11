import { redirect } from 'atomic-router';
import { sample } from 'effector';
import { logoutModel } from '@/features/auth';
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
	clock: pageModel.loaded,
	target: authModel.query.start,
});
