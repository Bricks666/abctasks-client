import { combine, createEffect, createStore } from "effector-logger";
import { LoginRequest, RegistrationRequest } from "../../interfaces/requests";

export interface User {
	readonly userId: number;
	readonly login: string;
	readonly photo: string | null;
}

interface UserStore {
	readonly user: User;
	readonly isLogin: boolean;
	readonly isAuthorizing: boolean;
}

export const $Login = createStore<boolean>(false, { name: "Login" });
export const $User = createStore<User>(
	{ userId: 0, login: "", photo: null },
	{ name: "User" }
);
export const $Authorizing = createStore<boolean>(true, { name: "Authorizing" });

export const loginFx = createEffect<LoginRequest, User>("loginFx");
export const authFx = createEffect<void, User>("authFx");
export const registrationFx = createEffect<RegistrationRequest, void>(
	"registrationFx"
);
export const logoutFx = createEffect<void, void>("logoutFx");
export const refreshFx = createEffect<void, void>("refreshFx");

export const $UserStore = combine<UserStore>({
	user: $User,
	isLogin: $Login,
	isAuthorizing: $Authorizing,
});
