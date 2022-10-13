import { VoidResponse, StandardResponse } from '@/types/response';
import {
	AuthResponse,
	LoginRequest,
	RegistrationRequest,
	Tokens,
} from '@/models/auth';
import { instance } from './instance';

export const login = async (credentials: LoginRequest) => {
	const response = await instance.post<StandardResponse<AuthResponse>>(
		'/auth/login',
		credentials
	);
	return response.data;
};

export const auth = async () => {
	const response = await instance.get<StandardResponse<AuthResponse>>('/auth');

	return response.data;
};

export const registration = async (credentials: RegistrationRequest) => {
	const response = await instance.post<StandardResponse<VoidResponse>>(
		'/auth/registration',
		credentials
	);
	return response.data;
};

export const logout = async () => {
	const response = await instance.delete<StandardResponse<boolean>>(
		'/auth/logout'
	);
	return response.data;
};

export const refresh = async () => {
	const response = await instance.get<StandardResponse<Tokens>>(
		'/auth/refresh'
	);
	return response.data;
};
