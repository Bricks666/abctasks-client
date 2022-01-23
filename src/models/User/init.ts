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
import { auth, login, registration } from "../../api";

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

$Login
	.on([authFx.done, loginFx.done], () => true)
	.on([logoutFx.done, refreshFx.fail], () => false);

$User.on([loginFx.doneData, authFx.doneData], (_, user) => user);

$Authorizing.on(authFx.pending, (_, isLoading) => isLoading);
