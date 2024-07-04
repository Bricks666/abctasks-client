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
	http.put('/api/auth/registration/activate', () => {
		return HttpResponse.json({
			data: true,
			statusCode: 200,
		});
	}),
];

const invitationHandlers = [
	http.delete('/api/invitations/invite/:roomId/:id', () => {
		return HttpResponse.json({
			data: true,
			statusCode: 200,
		});
	}),
];

const handlers = [...authHandlers, ...invitationHandlers];

export const server = setupServer(...handlers);
