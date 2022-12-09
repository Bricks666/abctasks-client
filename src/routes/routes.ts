import { ComponentType, lazy } from 'react';
import { createRoute, UnmappedRouteObject } from 'atomic-router';
import { paths } from '@/const';

export const roomsRoute = createRoute();
export const roomRoute = createRoute<{ id: number }>();
export const loginRoute = createRoute();
export const registrationRoute = createRoute();

const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RegistrationPage = lazy(() => import('@/pages/RegistrationPage'));
const RoomsPage = lazy(() => import('@/pages/RoomsPage'));
const RoomPage = lazy(() => import('@/pages/RoomPage'));

interface Route extends UnmappedRouteObject<any> {
	readonly Component: ComponentType;
}

export const routes: Route[] = [
	{
		path: paths.rooms,
		Component: RoomsPage,
		route: roomsRoute,
	},
	{
		path: paths.room,
		Component: RoomPage,
		route: roomRoute,
	},
	{
		path: paths.login,
		Component: LoginPage,
		route: loginRoute,
	},
	{
		path: paths.registration,
		Component: RegistrationPage,
		route: registrationRoute,
	},
];
