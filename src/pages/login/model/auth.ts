import { redirect } from 'atomic-router';
import { loginModel } from '@/features/auth';
import { authModel } from '@/entities/auth';
import { routes } from '@/shared/configs';

redirect({
	clock: authModel.authQuery.finished.success,
	route: routes.rooms,
});

redirect({
	clock: loginModel.loginMutation.finished.success,
	route: routes.rooms,
});
