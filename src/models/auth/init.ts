import { forward, sample } from 'effector';
import { authApi } from '@/api';
import {
	$AccessToken,
	$AuthUser,
	$IsRegistered,
	authFx,
	authGate,
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
	clock: registrationMutation.finished.success,
	fn: () => true,
	target: $IsRegistered,
});

sample({
	clock: authGate.open,
	target: authQuery.start,
});
