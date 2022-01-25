import { forward } from "effector";
import {
	$Authorizing,
	$Login,
	$User,
	authFx,
	loginFx,
	logoutFx,
	refreshFx,
	registrationFx,
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

$Login
	.on([authFx.done, loginFx.done], () => true)
	.on([logoutFx.done, refreshFx.fail], () => false);

forward({
	from: [loginFx.doneData, authFx.doneData],
	to: $User,
});

forward({
	from: authFx.pending,
	to: $Authorizing,
});
