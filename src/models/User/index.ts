import { createDomain } from "effector-logger";

export interface User {
	readonly userId: number;
	readonly login: string;
	readonly photo: string | null;
}

export const initialUser = { userId: 0, login: "", photo: null };

export const UserDomain = createDomain("UserDomain");

export const $User = UserDomain.createStore<User>(initialUser, {
	name: "User",
});

export const loadUserFx = UserDomain.createEffect<void, User>("loadUserFx");
export const updateUserFx = UserDomain.createEffect<void, User>("updateUserFx");

export const loadUser = UserDomain.createEvent<void>("loadUserEvent");
export const updateUser = UserDomain.createEvent<void>("updateUserEvent");
