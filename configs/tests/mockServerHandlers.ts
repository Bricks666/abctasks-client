import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';

const authHandlers = [
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
];

const handlers = [...authHandlers];

export const server = setupServer(...handlers);
