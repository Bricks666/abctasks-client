import { redirect } from 'atomic-router';
import { authModel } from '@/entities/auth';
import { routes } from '@/shared/configs';
import { loadedAndAuthSuccess } from './page';

redirect({
	clock: [authModel.query.finished.success, loadedAndAuthSuccess],
	route: routes.rooms,
});
