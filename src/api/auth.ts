import { LoginRequest, RegistrationRequest } from "@/interfaces/requests";
import { TokensResponse, VoidResponse } from "@/interfaces/response";
import { instance } from "./instance";

export const loginApi = async (credentials: LoginRequest) => {
	const response = await instance.post<TokensResponse>(
		"/auth/login",
		credentials
	);
	return response.data;
};

export const authApi = async () => {
	const response = await instance.get<TokensResponse>("/auth");

	return response.data;
};

export const registrationApi = async (credentials: RegistrationRequest) => {
	const response = await instance.put<VoidResponse>(
		"/auth/registration",
		credentials
	);

	return response.data;
};

export const logoutApi = async () => {
	const response = await instance.delete<VoidResponse>("/auth/logout");

	return response.data;
};

export const refreshApi = async () => {
	const response = await instance.get<TokensResponse>("/auth/refresh");

	return response.data;
};
