import { ComponentType, lazy } from 'react';
import { routes as r } from '@/const';

interface Route {
	readonly path: string;
	readonly Component: ComponentType;
	readonly isOnlyAuth?: true;
}

const LoginPage = lazy(() => import('@/pages/LoginPage'));
const RegistrationPage = lazy(() => import('@/pages/RegistrationPage'));
const RoomsPage = lazy(() => import('@/pages/RoomsPage'));
const RoomPage = lazy(() => import('@/pages/RoomPage'));
const SettingsPage = lazy(() => import('@/pages/SettingsPage'));
const NotFoundPage = lazy(() => import('@/pages/NotFound'));

export const routes: Route[] = [
	{
		path: r.ROUTES.ROOMS,
		Component: RoomsPage,
		isOnlyAuth: true,
	},
	{
		path: r.ROUTES.ROOM,
		Component: RoomPage,
	},
	{
		path: r.ROUTES.LOGIN,
		Component: LoginPage,
	},
	{
		path: r.ROUTES.REGISTRATION,
		Component: RegistrationPage,
	},
	{
		path: r.ROUTES.SETTINGS,
		Component: SettingsPage,
		isOnlyAuth: true,
	},
	{
		path: r.ROUTES.NOT_FOUND,
		Component: NotFoundPage,
	},
];
