import { Record, String, Static } from 'runtypes';
import { userResponse } from '../User';

export const tokensResponse = Record({
	accessToken: String,
	refreshToken: String,
}).asReadonly();

export interface TokensResponse extends Static<typeof tokensResponse> {}

export const authResponse = Record({
	tokens: tokensResponse,
	user: userResponse,
}).asReadonly();

export interface AuthResponse extends Static<typeof authResponse> {}

export interface LoginRequest {
	readonly login: string;
	readonly password: string;
	readonly rememberMe: boolean;
}

export interface RegistrationRequest {
	readonly login: string;
	readonly password: string;
	readonly repeatPassword: string;
}
