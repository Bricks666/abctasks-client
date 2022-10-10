export interface LoginRequest {
	readonly login: string;
	readonly password: string;
	readonly rememberMe: boolean;
}
