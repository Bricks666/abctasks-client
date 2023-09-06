import { Record, String, Static, Number } from 'runtypes';

import { tokens } from '../request';

export const user = Record({
	id: Number,
	email: String,
	username: String,
	photo: String.nullable(),
}).asReadonly();

export interface User extends Static<typeof user> {}

export const authResponse = Record({
	tokens,
	user,
}).asReadonly();

export interface AuthResponse extends Static<typeof authResponse> {}

export interface LoginParams {
	readonly email: string;
	readonly password: string;
	readonly rememberMe: boolean;
}

export interface RegistrationParams {
	readonly email: string;
	readonly username: string;
	readonly password: string;
}

export interface ActivateParams {
	readonly token: string;
}
