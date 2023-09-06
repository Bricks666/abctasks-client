import { redirect } from 'atomic-router';

import { routes } from '@/shared/configs';
import { sessionModel } from '@/shared/models';

import { loadedAndAuthSuccess } from './page';

redirect({
	clock: [sessionModel.query.finished.success, loadedAndAuthSuccess],
	route: routes.rooms,
});
