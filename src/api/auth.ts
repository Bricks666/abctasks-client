import { LoginRequest, RegistrationRequest } from "../interfaces/requests";
import {
	TokensResponse,
	UserResponse,
	VoidResponse,
} from "../interfaces/response";
import { instance } from "./instance";

export const login = async (credentials: LoginRequest) => {

	const response = await instance.post<UserResponse & TokensResponse>(
		"/auth/login",
		credentials
	);
	return response.data;
};

export const auth = async () => {
	const response = await instance.get<UserResponse & TokensResponse>("/auth");

	return response.data;
};

export const registration = async (credentials: RegistrationRequest) => {
	const response = await instance.put<VoidResponse>(
		"/auth/registration",
		credentials
	);

	return response.data;
};

export const logout = async () => {
	const response = await instance.delete<VoidResponse>("/auth/logout");

	return response.data;
};

export const refresh = async () => {
	const response = await instance.get<TokensResponse>("/auth/refresh");

	return response.data;
};
