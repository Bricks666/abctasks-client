import { sample } from 'effector';

import {
	approveInvitationModel,
	rejectInvitationModel
} from '@/features/invitation';

import { invitationViaTokenModel } from '@/entities/invitations';

import { routes } from '@/shared/configs';
import { chainInternalRoute } from '@/shared/lib';
import { sessionModel } from '@/shared/models';

export const currentRoute = routes.rooms.invite;
export const authorizedRoute = sessionModel.chainAuthorized(currentRoute, {
	otherwise: routes.login.open,
});

export const hiddenRoute = chainInternalRoute(authorizedRoute, {
	otherwise: routes.rooms.base.open,
	isInternal: authorizedRoute.$query.map((query) => Boolean(query.token)),
});

sample({
	clock: hiddenRoute.opened,
	fn: ({ query, }) => {
		return { token: query.token, };
	},
	target: invitationViaTokenModel.query.start,
});

sample({
	clock: hiddenRoute.closed,
	target: invitationViaTokenModel.query.reset,
});

sample({
	clock: invitationViaTokenModel.query.finished.failure,
	target: routes.rooms.base.open,
});

sample({
	clock: [approveInvitationModel.mutation.finished.success],
	source: invitationViaTokenModel.query.$data,
	filter: Boolean,
	fn: (invitation) => ({ id: invitation.room.id, }),
	target: routes.room.tasks.open,
});

sample({
	clock: [rejectInvitationModel.mutation.finished.success],
	source: invitationViaTokenModel.query.$data,
	filter: Boolean,
	target: routes.rooms.base.open,
});
