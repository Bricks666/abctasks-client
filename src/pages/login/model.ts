import { sessionModel } from '@/shared/models';

const routes = {};

export const currentRoute = routes.login;
export const anonymousRoute = sessionModel.chainAnonymous(currentRoute, {
	otherwise: routes.rooms.base.open,
});
