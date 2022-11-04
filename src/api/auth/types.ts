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
