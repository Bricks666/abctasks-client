import { forward, sample } from 'effector';
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
	registrationFx,
} from './units';
import {
	authQuery,
	loginMutation,
	logoutMutation,
	registrationMutation,
} from './queries';
import { goToState, saveCurrentLocation } from '../routing';

authFx.use(authApi.auth);
loginFx.use(authApi.login);
registrationFx.use(authApi.registration);
logoutFx.use(authApi.logout);

sample({
	clock: authQuery.finished.success,
	source: authQuery.$data,
	fn: (data) => data!.data.user,
	target: $AuthUser,
});

sample({
	clock: authQuery.finished.success,
	source: authQuery.$data,
	fn: (data) => data!.data.tokens.accessToken,
	target: $AccessToken,
});

forward({
	from: loginMutation.finished.success,
	to: authQuery.start,
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
		registrationMutation.finished.success,
	],
	route: loginRoute,
});

sample({
	clock: authQuery.finished.success,
	target: goToState,
});
