import { fetcher } from '@/shared/lib';
import { StandardResponse } from '@/shared/types';
import {
	AuthResponse,
	LoginParams,
	RegistrationParams,
	Tokens,
	User
} from './types';

const authFetcher = fetcher.create({
	baseURL: 'auth',
});

export const login = async (body: LoginParams) => {
	return authFetcher.post<StandardResponse<AuthResponse>>({
		path: { url: 'login', },
		body,
	});
};

export const auth = async () => {
	return authFetcher.get<StandardResponse<AuthResponse>>({
		path: { url: '', },
	});
};

export const registration = async (body: RegistrationParams) => {
	return authFetcher.post<StandardResponse<User>>({
		path: { url: 'registration', },
		body,
	});
};

export const logout = async () => {
	return authFetcher.delete<StandardResponse<boolean>>({
		path: { url: 'logout', },
	});
};

export const refresh = async () => {
	return authFetcher.get<StandardResponse<Tokens>>({
		path: { url: 'refresh', },
	});
};