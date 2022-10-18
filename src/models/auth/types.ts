import { Record, String, Static, Number } from 'runtypes';

export const user = Record({
	id: Number,
	login: String,
	photo: String.nullable(),
}).asReadonly();

export type User = Static<typeof user>;

export const tokens = Record({
	accessToken: String,
	refreshToken: String,
}).asReadonly();

export interface Tokens extends Static<typeof tokens> {}

export const authResponse = Record({
	tokens,
	user,
}).asReadonly();

export interface AuthResponse extends Static<typeof authResponse> {}
