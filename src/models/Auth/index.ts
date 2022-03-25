import { LoginRequest, RegistrationRequest } from "@/interfaces/requests";
import { createDomain } from "effector-logger";

export const Auth = createDomain("AuthDomain");

export const $Login = Auth.store<boolean>(false, { name: "Login" });

export const $Authorizing = Auth.store<boolean>(true, {
	name: "Authorizing",
});

export const $LoginError = Auth.store<object | null>(null, {
	name: "LoginError",
});
export const $RegistrationError = Auth.store<object | null>(null, {
	name: "RegistrationError",
});

export const loginFx = Auth.effect<LoginRequest, void>("loginFx");
export const authFx = Auth.effect<void, void>("authFx");
export const registrationFx = Auth.effect<RegistrationRequest, void>(
	"registrationFx"
);
export const logoutFx = Auth.effect<void, void>("logoutFx");
export const refreshFx = Auth.effect<void, void>("refreshFx");

export const login = Auth.event<LoginRequest>("loginEvent");
export const auth = Auth.event<void>("authEvent");
export const registration =
	Auth.event<RegistrationRequest>("registrationEvent");
export const logout = Auth.event("logoutEvent");
export const refresh = Auth.event<void>("refreshEvent");
export const clearLoginError = Auth.event<void>("clearLoginError");
export const clearRegistrationError = Auth.event<void>(
	"clearRegistrationError"
);
