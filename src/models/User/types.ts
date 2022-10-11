import { Record, Number, String, Static } from 'runtypes';

export interface User {
	readonly userId: number;
	readonly login: string;
	readonly photo: string | null;
}

export const userResponse = Record({
	userId: Number,
	login: String,
	photo: String.nullable(),
}).asReadonly();

export type UserResponse = Static<typeof userResponse>;

export interface UpdateUserRequest {
	readonly login: string;
	readonly photo: FileList | string | null;
}
