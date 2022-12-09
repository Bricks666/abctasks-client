import { StandardResponse, VoidResponse } from '@/shared/types';
import { fetcher } from '../packages';
import {
	AuthResponse,
	LoginRequest,
	RegistrationRequest,
	Tokens
} from './types';

const authFetcher = fetcher.create({
	baseURL: 'auth',
});

export const login = async (body: LoginRequest) => {
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

export const registration = async (body: RegistrationRequest) => {
	return authFetcher.post<StandardResponse<VoidResponse>>({
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
