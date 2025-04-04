import queryString from 'query-string';

import { instance } from '../request';

import type {
	ActivateUserRequestParams,
	ActivateUserResponseData,
	AuthResponseData,
	LoginRequestParams,
	LoginResponseData,
	LogoutResponseData,
	RegistrationRequestParams,
	RegistrationResponseData
} from './types';

export const auth = async (): AuthResponseData => {
	return instance.get('auth', { credentials: 'include', }).json();
};

export const login = async (
	params: LoginRequestParams,
	options?: globalThis.RequestInit
): LoginResponseData => {
	return instance
		.post('auth/login', {
			json: params,
			...options,
		})
		.json();
};

export const registration = async (
	params: RegistrationRequestParams,
	options?: globalThis.RequestInit
): RegistrationResponseData => {
	return instance
		.post('auth/registration', {
			json: params,
			...options,
		})
		.json();
};

export const activateUser = async (
	params: ActivateUserRequestParams,
	options?: globalThis.RequestInit
): ActivateUserResponseData => {
	return instance
		.put('auth/registration/activate', {
			...options,
			searchParams: new URLSearchParams(queryString.stringify(params)),
		})
		.json();
};

export const logout = async (
	options?: globalThis.RequestInit
): LogoutResponseData => {
	return instance.delete('auth/logout', options).json();
};
