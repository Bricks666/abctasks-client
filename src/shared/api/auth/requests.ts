import { StandardResponse } from '@/shared/types';
import { instance, normalizeQuery } from '../request';
import {
	ActivateParams,
	AuthResponse,
	LoginParams,
	RegistrationParams,
	User
} from './types';

export const auth = async () => {
	return instance
		.get('auth', { credentials: 'include', })
		.json<StandardResponse<AuthResponse>>();
};

export const login = async (body: LoginParams) => {
	return instance
		.post('auth/login', {
			json: body,
		})
		.json<StandardResponse<AuthResponse>>();
};

export const registration = async (body: RegistrationParams) => {
	return instance
		.post('auth/registration', {
			json: body,
		})
		.json<StandardResponse<User>>();
};

export const activate = async (query: ActivateParams) => {
	return instance
		.put('auth/registration/activate', {
			searchParams: new URLSearchParams(normalizeQuery(query)),
		})
		.json<StandardResponse<boolean>>();
};

export const logout = async () => {
	return instance.delete('auth/logout').json<StandardResponse<boolean>>();
};
