import { LoginRequest, RegistrationRequest } from '@/interfaces/requests';
import { TokensResponse, VoidResponse } from '@/interfaces/response';
import { StandardResponse } from '@/interfaces/response/standardResponse';
import { AuthResponse } from '@/models/auth/types';
import { instance } from './instance';

export const loginApi = async (credentials: LoginRequest) => {
	const response = await instance.post<StandardResponse<AuthResponse>>(
		'/auth/login',
		credentials
	);
	return response.data;
};

export const authApi = async () => {
	const response = await instance.get<StandardResponse<AuthResponse>>('/auth');

	return response.data;
};

export const registrationApi = async (credentials: RegistrationRequest) => {
	const response = await instance.put<StandardResponse<VoidResponse>>(
		'/auth/registration',
		credentials
	);

	return response.data;
};

export const logoutApi = async () => {
	const response = await instance.delete<StandardResponse<boolean>>(
		'/auth/logout'
	);

	return response.data;
};

export const refreshApi = async () => {
	const response = await instance.get<StandardResponse<TokensResponse>>(
		'/auth/refresh'
	);

	return response.data;
};
