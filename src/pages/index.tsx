import { createRoutesView } from 'atomic-router-react';

import { loginPage } from './login';
import { registrationPage } from './registration';
import { activateAccountPage } from './registration-activate';
import { thanksRegistrationPage } from './registration-thanks';
import { roomActivitiesPage } from './room-activities';
import { roomTagsPage } from './room-tags';
import { roomTasksPage } from './room-tasks';
import { roomUsersPage } from './room-users';
import { roomsPage } from './rooms';
import { settingsPage } from './settings';

const Routes = createRoutesView({
	routes: [
		loginPage,
		registrationPage,
		thanksRegistrationPage,
		activateAccountPage,
		roomTagsPage,
		roomTasksPage,
		roomUsersPage,
		roomActivitiesPage,
		roomsPage,
		settingsPage
	],
});

export const Pages = () => {
	return <Routes />;
};
