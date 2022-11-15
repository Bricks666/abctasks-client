import { ComponentType, lazy } from 'react';
import { createRoute, redirect, UnmappedRouteObject } from 'atomic-router';

export const roomsRoute = createRoute();
export const roomRoute = createRoute<{ id: number }>();
export const loginRoute = createRoute();
export const registrationRoute = createRoute();
export const notFoundRoute = createRoute();
roomRoute.$params.watch(console.debug);

redirect({
	clock: notFoundRoute.opened,
	route: roomsRoute,
});

const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RegistrationPage = lazy(() => import('@/pages/RegistrationPage'));
const RoomsPage = lazy(() => import('@/pages/RoomsPage'));
const RoomPage = lazy(() => import('@/pages/RoomPage'));

interface Route extends UnmappedRouteObject<any> {
	readonly Component: ComponentType;
}

export const routes: Route[] = [
	{
		path: '/rooms',
		Component: RoomsPage,
		route: roomsRoute,
	},
	{
		path: '/rooms/:id',
		Component: RoomPage,
		route: roomRoute,
	},
	{
		path: '/login',
		Component: LoginPage,
		route: loginRoute,
	},
	{
		path: '/registration',
		Component: RegistrationPage,
		route: registrationRoute,
	},
];
