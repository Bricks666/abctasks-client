import { redirect } from 'atomic-router';
import { sample } from 'effector';
import { authApi } from '@/shared/api';
import { loginRoute, roomsRoute } from '@/shared/configs';
import { goToState, saveCurrentLocation } from '../../configs/routes';
import {
	authQuery,
	loginMutation,
	logoutMutation,
	registrationMutation
} from './queries';
import {
	$AccessToken,
	$AuthUser,
	authFx,
	AuthGate,
	loginFx,
	logoutFx,
	registrationFx
} from './units';

authFx.use(authApi.auth);
loginFx.use(authApi.login);
registrationFx.use(authApi.registration);
logoutFx.use(authApi.logout);

sample({
	clock: [authQuery.finished.success],
	fn: ({ result, }) => result.data.user,
	target: $AuthUser,
});

sample({
	clock: authQuery.finished.success,
	fn: ({ result, }) => result.data.tokens.accessToken,
	target: $AccessToken,
});

sample({
	clock: logoutMutation.finished.success,
	fn: () => null,
	target: [$AccessToken, $AuthUser],
});

sample({
	clock: AuthGate.open,
	target: [authQuery.start, saveCurrentLocation],
});

redirect({
	clock: loginMutation.finished.success,
	route: roomsRoute,
});

redirect({
	clock: [
		logoutMutation.finished.success,
		registrationMutation.finished.success
	],
	route: loginRoute,
});

sample({
	clock: authQuery.finished.success,
	target: goToState,
});
