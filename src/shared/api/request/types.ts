import { Record, Static, String } from 'runtypes';

export const tokens = Record({
	accessToken: String,
	refreshToken: String,
}).asReadonly();

export interface Tokens extends Static<typeof tokens> {}
