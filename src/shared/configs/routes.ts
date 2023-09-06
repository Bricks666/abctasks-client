import {
	createHistoryRouter,
	createRoute,
	createRouterControls
} from 'atomic-router';

export const routes = {
	rooms: createRoute(),
	room: {
		base: createRoute<{ id: number; tab: string }>(),
		tasks: createRoute<{ id: number }>(),
		tags: createRoute<{ id: number }>(),
		activities: createRoute<{ id: number }>(),
		users: createRoute<{ id: number }>(),
	},
	login: createRoute(),
	registration: {
		base: createRoute(),
		tanks: createRoute(),
	},
	settings: createRoute(),
};

export const controls = createRouterControls();

export const router = createHistoryRouter({
	routes: [
		{
			path: '/login',
			route: routes.login,
		},
		{
			path: '/registration',
			route: routes.registration.base,
		},
		{
			path: '/registration/thanks',
			route: routes.registration.tanks,
		},
		{
			path: '/rooms',
			route: routes.rooms,
		},
		{
			path: '/rooms/:id/:tab',
			route: routes.room.base,
		},
		{
			path: '/rooms/:id/tasks',
			route: routes.room.tasks,
		},
		{
			path: '/rooms/:id/tags',
			route: routes.room.tags,
		},
		{
			path: '/rooms/:id/activities',
			route: routes.room.activities,
		},
		{
			path: '/rooms/:id/users',
			route: routes.room.users,
		},
		{
			path: '/settings',
			route: routes.settings,
		}
	],
	controls,
});
