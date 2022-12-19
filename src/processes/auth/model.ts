import { redirect } from 'atomic-router';
import { logoutModel } from '@/features/auth';
import { authModel } from '@/entities/auth';
import { routes } from '@/shared/configs';

redirect({
	clock: [authModel.authQuery.finished.failure],
	route: routes.login,
});

redirect({
	clock: logoutModel.logoutMutation.finished.success,
	route: routes.login,
});
