import { forward, guard, sample } from 'effector';
import {
	authApi,
	loginApi,
	logoutApi,
	refreshApi,
	registrationApi,
} from '@/api';
import {
	$Authorizing,
	$Login,
	$LoginError,
	$RegistrationError,
	auth,
	authFx,
	clearLoginError,
	clearRegistrationError,
	login,
	loginFx,
	logout,
	logoutFx,
	refresh,
	refreshFx,
	registration,
	registrationFx,
} from '.';
import { mayStartFxHandler } from '../handlers';

authFx.use(async () => {
	await authApi();
});
loginFx.use(async (credentials) => {
	await loginApi(credentials);
});
registrationFx.use(async (credentials) => {
	await registrationApi(credentials);
});
logoutFx.use(async () => {
	await logoutApi();
});
refreshFx.use(async () => {
	await refreshApi();
});

forward({
	from: [authFx.pending],
	to: $Authorizing,
});

guard({
	clock: login,
	filter: mayStartFxHandler(loginFx.pending),
	target: loginFx,
});

guard({
	clock: auth,
	filter: mayStartFxHandler(authFx.pending),
	target: authFx,
});

sample({
	clock: [loginFx.done, authFx.done],
	fn: () => true,
	target: $Login,
});

guard({
	clock: logout,
	filter: mayStartFxHandler(logoutFx.pending),
	target: logoutFx,
});

guard({
	clock: refresh,
	filter: mayStartFxHandler(refreshFx.pending),
	target: refreshFx,
});

sample({
	clock: [logoutFx.done, refreshFx.fail],
	fn: () => false,
	target: $Login,
});

guard({
	clock: registration,
	filter: mayStartFxHandler(registrationFx.pending),
	target: registrationFx,
});

sample({
	clock: loginFx.failData,
	fn: (data) => data,
	target: $LoginError,
});
sample({
	clock: registrationFx.failData,
	fn: (data) => data,
	target: $RegistrationError,
});

sample({
	clock: [loginFx.done, authFx.done, clearLoginError],
	fn: () => null,
	target: $LoginError,
});

sample({
	clock: [registrationFx.done, clearRegistrationError],
	fn: () => null,
	target: $RegistrationError,
});
