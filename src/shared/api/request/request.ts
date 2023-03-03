import ky from 'ky';
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
			async (_request, options, response) => {
				if (!response.ok) {
					return;
				}

				const body = await response.json();

				if (!('data' in body)) {
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

				const tokens = await instance
					.get('auth/refresh', { credentials: 'include', })
					.json<Tokens>();

				token = tokens.accessToken;

				request.headers.set('authorization', `Bearer ${token}`);

				return ky(request);
			}
		],
	},
});
