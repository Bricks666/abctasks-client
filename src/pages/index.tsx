import { createRoutesView } from 'atomic-router-react';
import * as React from 'react';
import { routes } from '@/shared/configs';

const LoginPage = React.lazy(() => import('./login'));
const RegistrationPage = React.lazy(() => import('./registration'));
const RegistrationThanksPage = React.lazy(() => import('./registration-tanks'));
const RoomPage = React.lazy(() => import('./room'));
const RoomsPage = React.lazy(() => import('./rooms'));

const Routes = createRoutesView({
	routes: [
		{
			route: routes.login,
			view: LoginPage,
		},
		{
			route: routes.registration.base,
			view: RegistrationPage,
		},
		{
			route: routes.registration.tanks,
			view: RegistrationThanksPage,
		},
		{
			route: routes.room.base,
			view: RoomPage,
		},
		{
			route: routes.rooms,
			view: RoomsPage,
		}
	],
});

export const Pages = () => {
	return <Routes />;
};
