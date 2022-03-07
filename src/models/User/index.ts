import { createDomain } from "effector-logger";
import { LoginRequest, RegistrationRequest } from "@/interfaces/requests";

export interface User {
	readonly userId: number;
	readonly login: string;
	readonly photo: string | null;
}

export const initialUser = { userId: 0, login: "", photo: null };

export const Auth = createDomain("AuthDomain");

export const $Login = Auth.createStore<boolean>(false, { name: "Login" });
export const $User = Auth.createStore<User>(initialUser, { name: "User" });
export const $Authorizing = Auth.createStore<boolean>(true, {
	name: "Authorizing",
});

export const loginFx = Auth.createEffect<LoginRequest, User>("loginFx");
export const authFx = Auth.createEffect<void, User>("authFx");
export const registrationFx = Auth.createEffect<RegistrationRequest, void>(
	"registrationFx"
);
export const logoutFx = Auth.createEffect<void, void>("logoutFx");
export const refreshFx = Auth.createEffect<void, void>("refreshFx");

export const login = Auth.createEvent<LoginRequest>("loginEvent");
export const auth = Auth.createEvent<void>("authEvent");
export const registration =
	Auth.createEvent<RegistrationRequest>("registrationEvent");
export const logout = Auth.createEvent("logoutEvent");
export const refresh = Auth.createEvent<void>("refreshEvent");
