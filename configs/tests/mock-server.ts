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
	http.put('/api/invitations/invite/reject', () => {
		return HttpResponse.json({
			data: true,
			statusCode: 200,
		});
	}),
	http.put('/api/invitations/invite/approve', () => {
		return HttpResponse.json({
			data: true,
			statusCode: 200,
		});
	}),
	http.post('/api/invitations/invite/:roomId/generate-link', ({ params }) => {
		return HttpResponse.json({
			data: `https://localhost:3000/invitation-link-to-room-${params.roomId}`,
			statusCode: 200,
		});
	}),
	http.post('/api/invitations/invite/:roomId', () => {
		return HttpResponse.json({
			data: {
				id: 123,
				room: {
					id: 123,
					ownerId: 123,
					name: 'Room',
					description: 'Some room',
					canChange: true,
				},
				user: {
					id: 123,
					email: 'email@example.org',
					username: 'username',
					photo: null,
				},
				inviter: {
					id: 123,
					email: 'email@example.org',
					username: 'username',
					photo: null,
				},
				status: 'sended',
			},
			statusCode: 200,
		});
	}),
];

const users = [
	{
		id: 1,
		email: 'email@example.org',
		username: 'username',
		photo: null,
	},
	{
		id: 2,
		email: 'another-email@example.org',
		username: 'Cool-user',
		photo: null,
	},
	{
		id: 3,
		email: 'some-strange-email@example.org',
		username: 'Shit-user',
		photo: null,
	},
];

const usersHandlers = [
	http.get('/api/users', ({ request }) => {
		const url = new URL(request.url);
		const username = url.searchParams.get('username');

		const searchedUsers = users.filter((user) =>
			user.username.includes(username)
		);

		return HttpResponse.json({
			data: searchedUsers,
			statusCode: 200,
		});
	}),
];

const handlers = [...authHandlers, ...invitationHandlers, ...usersHandlers];

export const server = setupServer(...handlers);
