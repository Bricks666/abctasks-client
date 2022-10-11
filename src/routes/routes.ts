import { ComponentType, lazy } from 'react';
import { ROUTES } from '@/const';

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
		path: ROUTES.ROOMS,
		Component: RoomsPage,
		isOnlyAuth: true,
	},
	{
		path: ROUTES.ROOM,
		Component: RoomPage,
	},
	{
		path: ROUTES.LOGIN,
		Component: LoginPage,
	},
	{
		path: ROUTES.REGISTRATION,
		Component: RegistrationPage,
	},
	{
		path: ROUTES.SETTINGS,
		Component: SettingsPage,
		isOnlyAuth: true,
	},
	{
		path: ROUTES.NOT_FOUND,
		Component: NotFoundPage,
	},
];
