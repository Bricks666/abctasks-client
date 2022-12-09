import { sample } from 'effector';
import { redirect } from 'atomic-router';
import { authApi } from '@/api';
import { loginRoute, roomsRoute } from '@/routes';
import {
	$AccessToken,
	$AuthUser,
	authFx,
	AuthGate,
	loginFx,
	logoutFx,
	registrationFx
} from './units';
import {
	authQuery,
	loginMutation,
	logoutMutation,
	registrationMutation
} from './queries';
import { goToState, saveCurrentLocation } from '../routing';

authFx.use(authApi.auth);
loginFx.use(authApi.login);
registrationFx.use(authApi.registration);
logoutFx.use(authApi.logout);

sample({
	clock: [authQuery.finished.success, loginMutation.finished.success],
	fn: ({ result, }) => result.data.user,
	target: $AuthUser,
});

sample({
	clock: authQuery.finished.success,
	fn: ({ result, }) => result.data.tokens.accessToken,
	target: $AccessToken,
});

sample({
	clock: loginMutation.finished.success,
	fn: ({ result, }) => result.data.user,
	target: $AuthUser,
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

redirect({
	clock: authQuery.finished.failure,
	route: loginRoute,
});

authQuery.finished.failure.watch(console.log);
