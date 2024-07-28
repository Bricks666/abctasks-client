import { setupServer } from 'msw/node';
import { HttpResponse, http } from 'msw';
import { Tasks } from '@/shared/api';

const createStandardResponse = (data: unknown): HttpResponse => {
	return HttpResponse.json({
		data,
		statusCode: 200,
	});
};

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

const tags = [
	{
		id: 1,
		roomId: 1,
		name: 'A tag',
		mainColor: '#123321',
		secondColor: '#564701',
	},
	{
		id: 2,
		roomId: 1,
		name: 'The tag',
		mainColor: '#AA3321',
		secondColor: '#FE4701',
	},
	{
		id: 4,
		roomId: 1,
		name: 'tag tag',
		mainColor: '#FAE321',
		secondColor: '#56F701',
	},
];

const tagsHandlers = [
	http.get('/api/tags/:roomId', () => {
		return HttpResponse.json({
			data: tags,
			statusCode: 200,
		});
	}),
	http.get('/api/tags/:roomId/:id', ({ params }) => {
		const { id } = params;

		const tag = tags.find((tag) => tag.id === Number(id));

		return HttpResponse.json({
			data: tag,
			statusCode: 200,
		});
	}),
	http.post('/api/tags/:roomId/create', async ({ request }) => {
		const { name, mainColor, secondColor } = await request.json();

		const room = {
			id: 12,
			roomId: 1,
			name,
			mainColor,
			secondColor,
		};

		return HttpResponse.json({
			data: room,
			statusCode: 200,
		});
	}),
	http.put('/api/tags/:roomId/:id/update', async ({ params, request }) => {
		const tag = tags.find((tag) => tag.id == params.id);
		const { name, mainColor, secondColor } = await request.json();

		return HttpResponse.json({
			data: {
				...tag,
				name,
				mainColor,
				secondColor,
			},
			statusCode: 200,
		});
	}),
	http.delete('/api/tags/:roomId/:id/remove', async () => {
		return HttpResponse.json({
			data: true,
			statusCode: 200,
		});
	}),
];

const members = users;

const membersHandlers = [
	http.get('/api/members/:roomId', () => {
		return createStandardResponse(members);
	}),
	http.delete('/api/members/:roomId/exit', () => {
		return createStandardResponse(true);
	}),
	http.delete('/api/members/:roomId/remove/:userId', ({ params }) => {
		const { userId } = params;

		return createStandardResponse(true);
	}),
];

const tasks: Tasks = [
	{
		id: 1,
		roomId: 1,
		tags: tags.slice(1),
		author: users[0],
		title: 'Title 1',
		description: 'Description 1',
		status: 'done',
		createdAt: new Date().toString(),
		updatedAt: new Date().toString(),
	},
	{
		id: 2,
		roomId: 1,
		tags: tags.slice(2),
		author: users[0],
		title: 'Title 2',
		description: 'Description 2',
		status: 'ready',
		createdAt: new Date().toString(),
		updatedAt: null,
	},
];

const tasksHandlers = [
	http.get('/api/tasks/:roomId', () => {
		return createStandardResponse(tasks);
	}),
	http.get('/api/tasks/:roomId/:taskId', ({ params }) => {
		const { taskId } = params;
		const task = tasks.find((task) => task.id === parseInt(taskId as string));

		return createStandardResponse(task);
	}),
	http.post('/api/tasks/:roomId/create', async ({ request }) => {
		const { title, tagIds, status, description } = await request.json();
		const taskTags = tags.filter((tag) => tagIds.includes(tag.id));
		const task = {
			id: 4,
			roomId: 1,
			tags: taskTags,
			author: users[0],
			title,
			description,
			status,
			createdAt: new Date(),
			updatedAt: null,
		};

		return createStandardResponse(task);
	}),
	http.put('/api/tasks/:roomId/:taskId/update', async ({ request, params }) => {
		const { title, tagIds, status, description } = await request.json();
		const { taskId } = params;
		const task = tasks.find((task) => task.id === parseInt(taskId as string));
		const taskTags = tags.filter((tag) => tagIds.includes(tag.id));
		const updatedTask = {
			...task,
			tags: taskTags,
			title,
			description,
			status,
			updatedAt: new Date(),
		};

		return createStandardResponse(updatedTask);
	}),
	http.delete('/api/tasks/:roomId/:taskId/remove', () => {
		return createStandardResponse(true);
	}),
];

const handlers = [
	...authHandlers,
	...invitationHandlers,
	...usersHandlers,
	...actionsHandlers,
	...membersHandler,
	...roomsHandlers,
	...tagsHandlers,
	...membersHandlers,
	...tasksHandlers,
];

export const server = setupServer(...handlers);
