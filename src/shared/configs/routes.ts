import { createRoute, createRouterControls } from 'atomic-router';

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
};

export const controls = createRouterControls();
