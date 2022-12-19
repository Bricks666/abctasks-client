import { redirect } from 'atomic-router';
import { registrationModel } from '@/features/auth';
import { authModel } from '@/entities/auth';
import { routes } from '@/shared/configs';

redirect({
	clock: [registrationModel.registrationMutation.finished.success],
	route: routes.login,
});

redirect({
	clock: authModel.authQuery.finished.success,
	route: routes.rooms,
});
