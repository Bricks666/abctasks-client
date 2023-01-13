import { redirect } from 'atomic-router';
import { sample } from 'effector';
import { registrationModel } from '@/features/auth';
import { authModel } from '@/entities/auth';
import { routes } from '@/shared/configs';
import { loadedAndAuthSuccess } from './page';

redirect({
	clock: [registrationModel.mutation.finished.success],
	route: routes.login,
});

redirect({
	clock: [authModel.query.finished.success, loadedAndAuthSuccess],
	route: routes.rooms,
});

sample({
	clock: routes.registration.closed,
	target: registrationModel.form.reset,
});
