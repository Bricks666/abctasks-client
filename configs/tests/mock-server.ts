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

const membersHandler = [
	http.get('/api/members/:roomId', () => {
		return HttpResponse.json({
			data: users,
			statusCode: 200,
		});
	}),
];

const actions = [
	{
		id: 1,
		name: 'created',
	},
	{
		id: 2,
		name: 'updated',
	},
	{
		id: 3,
		name: 'removed',
	},
];

const spheres = [
	{
		id: 1,
		name: 'task',
	},
	{
		id: 2,
		name: 'comment',
	},
	{
		id: 3,
		name: 'tag',
	},
];

const actionsHandlers = [
	http.get('api/activities/actions/all', () => {
		return HttpResponse.json({
			data: actions,
			statusCode: 200,
		});
	}),
	http.get('api/activities/spheres/all', () => {
		return HttpResponse.json({
			data: spheres,
			statusCode: 200,
		});
	}),
];

const rooms = [
	{
		id: 1,
		ownerId: 1,
		name: 'name',
		description: 'description',
		canChange: true,
	},
	{
		id: 2,
		ownerId: 1,
		name: 'name-2',
		description: 'description-2',
		canChange: true,
	},
];

const roomsHandlers = [
	http.get('/api/rooms', () => {
		return HttpResponse.json({
			data: rooms,
			statusCode: 200,
		});
	}),
	http.get('/api/rooms/:id', ({ params }) => {
		const room = rooms.find((room) => room.id === params.id);

		return HttpResponse.json({
			data: room,
			statusCode: 200,
		});
	}),
	http.put('/api/rooms/:id/update', async ({ params, request }) => {
		const room = rooms.find((room) => room.id == params.id);
		const { name, description } = await request.json();

		return HttpResponse.json({
			data: {
				...room,
				name,
				description,
			},
			statusCode: 200,
		});
	}),
	http.post('/api/rooms/create', async ({ request }) => {
		const { name, description } = await request.json();

		const room = {
			id: 123,
			name,
			description,
			ownerId: 1,
			canChange: true,
		};

		return HttpResponse.json({
			data: room,
			statusCode: 200,
		});
	}),
	http.delete('/api/rooms/:id/remove', () => {
		return HttpResponse.json({
			data: true,
			statusCode: 200,
		});
	}),
];

const handlers = [
	...authHandlers,
	...invitationHandlers,
	...usersHandlers,
	...actionsHandlers,
	...membersHandler,
	...roomsHandlers,
];

export const server = setupServer(...handlers);
