import { redirect } from 'atomic-router';
import { sample } from 'effector';

import { loginModel } from '@/features/auth';

import { routes } from '@/shared/configs';
import { sessionModel } from '@/shared/models';

import { loadedAndAuthSuccess } from './page';

redirect({
	clock: [
		sessionModel.query.finished.success,
		loginModel.mutation.finished.success,
		loadedAndAuthSuccess
	],
	route: routes.rooms,
});

sample({
	clock: routes.login.closed,
	target: loginModel.form.reset,
});
