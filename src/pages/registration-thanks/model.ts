import { routes } from '@/shared/configs';
import { sessionModel } from '@/shared/models';

export const currentRoute = routes.registration.tanks;
export const anonymousRoute = sessionModel.chainAnonymous(currentRoute, {
	otherwise: routes.rooms.open,
});

/**
 * @todo Add guard for redirect from this route if user was not redirected from registration page
 */
