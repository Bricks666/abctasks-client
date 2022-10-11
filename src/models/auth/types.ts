import { User } from '../User';

export interface TokensResponse {
	readonly accessToken: string;
	readonly refreshToken: string;
}

export interface AuthResponse {
	readonly tokens: TokensResponse;
	readonly user: User;
}

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
