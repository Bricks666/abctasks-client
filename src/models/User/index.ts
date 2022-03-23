import { UpdateProfileRequest } from "@/interfaces/requests";
import { UserResponse } from "@/interfaces/response";
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

export const loadUserFx = UserDomain.createEffect<void, UserResponse>(
	"loadUserFx"
);
export const updateProfileFx = UserDomain.createEffect<
	UpdateProfileRequest,
	UserResponse
>("updateProfileFx");

export const loadUser = UserDomain.createEvent<void>("loadUserEvent");
export const updateProfile =
	UserDomain.createEvent<UpdateProfileRequest>("updateProfileEvent");
