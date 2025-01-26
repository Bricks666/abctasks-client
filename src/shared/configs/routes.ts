import { compile } from 'path-to-regexp';

type AnyParams = Record<string, string | string[]>;

interface RouteInfo<Params extends AnyParams> {
	readonly pattern: string;
	readonly getPath: (params: Params) => string;
}

const createRouteInfo = <Params extends AnyParams>(
	path: string
): RouteInfo<Params> => {
	const toPath = compile(path);

	return {
		pattern: path,
		getPath(params: Params) {
			return toPath(params);
		},
	};
};

type RoutesInfo = Record<string, RouteInfo<any>>;

export const ROUTES = {
	login: createRouteInfo('/login'),
	registration: {
		root: createRouteInfo('/registration'),
		thanks: createRouteInfo('/registration/thanks'),
		activate: createRouteInfo('/registration/activate'),
	},
	rooms: {
		root: createRouteInfo('/rooms'),
		invitation: createRouteInfo('/rooms/invite'),
	},
	room: {
		root: createRouteInfo<{ id: string; tab: string }>('/rooms/:id/:tab'),
		tasks: createRouteInfo<{ id: string }>('/rooms/:id/tasks'),
		tags: createRouteInfo<{ id: string }>('/rooms/:id/tags'),
		activities: createRouteInfo<{ id: string }>('/rooms/:id/activities'),
		members: createRouteInfo<{ id: string }>('/rooms/:id/users'),
	},
	settings: createRouteInfo('/settings'),
} satisfies Record<string, RoutesInfo | RouteInfo<any>>;
