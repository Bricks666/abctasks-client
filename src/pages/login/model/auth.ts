import { redirect } from 'atomic-router';
import { loginModel } from '@/features/auth';
import { authModel } from '@/entities/auth';
import { routes } from '@/shared/configs';
import { loadedAndAuthSuccess } from './page';

redirect({
	clock: [
		authModel.query.finished.success,
		loginModel.mutation.finished.success,
		loadedAndAuthSuccess
	],
	route: routes.rooms,
});
