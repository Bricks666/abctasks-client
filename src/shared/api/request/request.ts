import ky from 'ky';

import { StandardResponse } from '@/shared/types';

import { api } from '../../configs';

import { Tokens } from './types';

let token: string | null = null;

export const instance = ky.create({
	mode: 'cors',
	prefixUrl: api,
	hooks: {
		beforeRequest: [
			(request) => {
				if (!token) {
					return;
				}
				if (request.headers.get('authorization')) {
					return;
				}

				request.headers.set('authorization', `Bearer ${token}`);
			}
		],
		afterResponse: [
			(request) => {
				const isLogout = request.url.includes('logout');

				if (isLogout) {
					token = null;
				}
			},
			async (_request, options, response) => {
				if (!response.ok) {
					return;
				}

				const body = await response.json();

				if (
					!('data' in body) ||
					typeof body.data !== 'object' ||
					body.data === null
				) {
					return;
				}
				if (!('tokens' in body.data)) {
					return;
				}
				if (!('accessToken' in body.data.tokens)) {
					return;
				}

				token = body.data.tokens.accessToken;
			},

			async (request, options, response) => {
				if (response.status !== 401) {
					return;
				}

				const { data: tokens, } = await instance
					.get('auth/refresh', { credentials: 'include', })
					.json<StandardResponse<Tokens>>();

				token = tokens.accessToken;

				request.headers.set('authorization', `Bearer ${token}`);

				return ky(request);
			}
		],
	},
});
