import { ID } from "@/interfaces/common";
import { UpdateProfileRequest } from "@/interfaces/requests";
import { UserResponse } from "@/interfaces/response";
import { createDomain } from "effector-logger";

export interface User {
	readonly userId: ID;
	readonly login: string;
	readonly photo: string | null;
}

export const initialUser = { userId: 0, login: "", photo: null };

export const UserDomain = createDomain("UserDomain");

export const $User = UserDomain.store<User>(initialUser, {
	name: "User",
});

export const loadUserFx = UserDomain.effect<void, UserResponse>("loadUserFx");
export const updateProfileFx = UserDomain.effect<
	UpdateProfileRequest,
	UserResponse
>("updateProfileFx");

export const loadUser = UserDomain.event<void>("loadUserEvent");
export const updateProfile =
	UserDomain.event<UpdateProfileRequest>("updateProfileEvent");
