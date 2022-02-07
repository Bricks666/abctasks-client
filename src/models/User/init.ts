import { forward, guard, sample } from "effector";
import {
	$Authorizing,
	$Login,
	authFx,
	loginFx,
	logoutFx,
	refreshFx,
	registrationFx,
	login as loginEv,
	logout as logoutEv,
	refresh as refreshEv,
	registration as registrationEv,
	auth as authEv,
} from ".";
import { auth, login, logout, refresh, registration } from "../../api";

authFx.use(async () => {
	const response = await auth();
	return response.user;
});
loginFx.use(async (credentials) => {
	const response = await login(credentials);
	return response.user;
});
registrationFx.use(async (credentials) => {
	await registration(credentials);
});
logoutFx.use(async () => {
	await logout();
});
refreshFx.use(async () => {
	await refresh();
});

forward({
	from: authFx.pending,
	to: $Authorizing,
});

guard({
	clock: loginEv,
	filter: sample({
		clock: loginFx.pending,
		fn: (isLoading) => !isLoading,
	}),
	target: loginFx,
});

guard({
	clock: authEv,
	filter: sample({
		clock: authFx.pending,
		fn: (isLoading) => !isLoading,
	}),
	target: authFx,
});

sample({
	clock: [loginFx.done, authFx.done],
	fn: () => true,
	target: $Login,
});

guard({
	clock: logoutEv,
	filter: sample({
		clock: logoutFx.pending,
		fn: (isLoading) => !isLoading,
	}),
	target: logoutFx,
});

guard({
	clock: refreshEv,
	filter: sample({
		clock: refreshFx.pending,
		fn: (isLoading) => !isLoading,
	}),
	target: refreshFx,
});

sample({
	clock: [logoutFx.done, refreshFx.fail],
	fn: () => false,
	target: $Login,
});

guard({
	clock: registrationEv,
	filter: sample({
		clock: registrationFx.pending,
		fn: (isLoading) => !isLoading,
	}),
	target: registrationFx,
});
