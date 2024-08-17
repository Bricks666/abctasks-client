/* eslint-disable import/no-extraneous-dependencies */
import { http } from 'msw';

import { defaultAuthData, defaultUser, tokens } from '../../fixtures';
import { BASE_URL } from '../constants';
import {
	conflictError,
	createStandardResponse,
	createUrl,
	forbiddenError,
	notFoundError,
	unauthorizedError
} from '../utils';

const baseUrl = createUrl(BASE_URL, 'auth');
const authUrl = baseUrl;
const registrationUrl = createUrl(baseUrl, 'registration');
const loginUrl = createUrl(baseUrl, 'login');
const logoutUrl = createUrl(baseUrl, 'logout');
const refreshUrl = createUrl(baseUrl, 'refresh');
const activateUrl = createUrl(registrationUrl, 'activate');

export const success = {
	auth: http.get(authUrl, () => {
		return createStandardResponse(defaultAuthData);
	}),
	registration: http.post(registrationUrl, () => {
		return createStandardResponse({ user: defaultUser, });
	}),
	login: http.post(loginUrl, () => {
		return createStandardResponse({ user: defaultUser, });
	}),
	logout: http.delete(logoutUrl, () => {
		return createStandardResponse(true);
	}),
	refresh: http.get(refreshUrl, () => {
		return createStandardResponse(tokens);
	}),
	activate: http.put(activateUrl, () => {
		return createStandardResponse(true);
	}),
};

export const error = {
	auth: http.get(authUrl, () => {
		return unauthorizedError;
	}),
	registration: http.post(registrationUrl, () => {
		return conflictError;
	}),
	login: {
		notFound: http.post(loginUrl, () => {
			return notFoundError;
		}),
		forbidden: http.post(loginUrl, () => {
			return forbiddenError;
		}),
	},
	activate: http.put(activateUrl, () => {
		return createStandardResponse(123);
	}),
};

export const standard = Object.values(success);
