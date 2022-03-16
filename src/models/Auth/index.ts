import { LoginRequest, RegistrationRequest } from "@/interfaces/requests";
import { createDomain } from "effector-logger";

export const Auth = createDomain("AuthDomain");

export const $Login = Auth.createStore<boolean>(false, { name: "Login" });

export const $Authorizing = Auth.createStore<boolean>(true, {
	name: "Authorizing",
});

export const $LoginError = Auth.createStore<object | null>(null, {
	name: "LoginError",
});
export const $RegistrationError = Auth.createStore<object | null>(null, {
	name: "RegistrationError",
});

export const loginFx = Auth.createEffect<LoginRequest, void>("loginFx");
export const authFx = Auth.createEffect<void, void>("authFx");
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
export const clearLoginError = Auth.createEvent<void>("clearLoginError");
export const clearRegistrationError = Auth.createEvent<void>(
	"clearRegistrationError"
);
