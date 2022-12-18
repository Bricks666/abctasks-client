import { redirect } from 'atomic-router';
import { sample } from 'effector';
import { loginModel, registrationModel } from '@/features/auth';
import { authModel } from '@/entities/auth';
import { routes } from '@/shared/configs';

redirect({
	clock: [
		authModel.authQuery.finished.failure,
		registrationModel.registrationMutation.finished.success
	],
	route: routes.login,
});

redirect({
	clock: loginModel.loginMutation.finished.success,
	route: routes.rooms,
});

const authOnLoginOrRegRoute = sample({
	clock: [authModel.authQuery.finished.success],
	source: {
		login: routes.login.$isOpened,
		registration: routes.registration.$isOpened,
	},
	filter: ({ login, registration, }) => login || registration,
});

redirect({
	clock: authOnLoginOrRegRoute,
	route: routes.rooms,
});
