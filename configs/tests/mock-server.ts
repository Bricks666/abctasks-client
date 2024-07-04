import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';

const authHandlers = [
	http.get('/api/auth', () => {
		return HttpResponse.json({
			data: {
				user: {
					id: 123,
					email: 'email@example.org',
					username: 'username',
					photo: null,
				},
				tokens: {
					accessToken: 'accessToken',
					refreshToken: 'refreshToken',
				},
			},
			statusCode: 200,
		});
	}),
	http.post('/api/auth/registration', () => {
		return HttpResponse.json({
			data: {
				user: {},
			},
		});
	}),
	http.post('/api/auth/login', () => {
		return HttpResponse.json({
			data: {
				user: {},
			},
		});
	}),
	http.delete('/api/auth/logout', () => {
		return HttpResponse.json({
			data: true,
			statusCode: 200,
		});
	}),
];

const handlers = [...authHandlers];

export const server = setupServer(...handlers);
