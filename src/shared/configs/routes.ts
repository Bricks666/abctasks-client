import { createRoute, createRouterControls } from 'atomic-router';

export const routes = {
	rooms: createRoute(),
	room: createRoute<{ id: number; tab?: string }>(),
	login: createRoute(),
	registration: createRoute(),
};

export const controls = createRouterControls();
