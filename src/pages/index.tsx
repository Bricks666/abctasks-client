import { createRoutesView } from 'atomic-router-react';
import * as React from 'react';
import { routes } from '@/shared/configs';

const LoginPage = React.lazy(() => import('./LoginPage'));
const RegistrationPage = React.lazy(() => import('./RegistrationPage'));
const RoomPage = React.lazy(() => import('./RoomPage'));
const RoomsPage = React.lazy(() => import('./RoomsPage'));

const Routes = createRoutesView({
	routes: [
		{
			route: routes.login,
			view: LoginPage,
		},
		{
			route: routes.registration,
			view: RegistrationPage,
		},
		{
			route: routes.room,
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
