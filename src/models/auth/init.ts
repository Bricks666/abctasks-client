import { forward, sample } from 'effector';
import {
	authApi,
	loginApi,
	logoutApi,
	refreshApi,
	registrationApi,
} from '@/api';
import {
	$AccessToken,
	$AuthUser,
	$IsRegistered,
	authFx,
	loginFx,
	logoutFx,
	refreshFx,
	registrationFx,
} from './units';
import {
	authQuery,
	loginMutation,
	logoutMutation,
	registrationMutation,
} from './queries';

authFx.use(authApi);
loginFx.use(loginApi);
registrationFx.use(registrationApi);
logoutFx.use(logoutApi);
refreshFx.use(refreshApi);

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
