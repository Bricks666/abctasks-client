import { createEvent, sample } from 'effector';
import { CreateSnackbarOptions } from 'effector-mui-snacks';
import { delay, splitMap } from 'patronum';

import { activateAccountModel } from '@/features/auth';

import { ActivateParams } from '@/shared/api';
import { i18n, routes } from '@/shared/configs';
import { chainInternalRoute, isHttpErrorCode } from '@/shared/lib';
import { notificationsModel, sessionModel } from '@/shared/models';

export const currentRoute = routes.registration.activate;
export const anonymousRoute = sessionModel.chainAnonymous(currentRoute, {
	otherwise: routes.rooms.open,
});
export const hiddenRoute = chainInternalRoute(anonymousRoute, {
	otherwise: routes.login.open,
	isInternal: anonymousRoute.$query.map((query) => Boolean(query.token)),
});
const tryActivate = createEvent<ActivateParams>();

sample({
	clock: hiddenRoute.closed,
	target: activateAccountModel.query.reset,
});

sample({
	clock: hiddenRoute.opened,
	fn: ({ query, }) => query as ActivateParams,
	target: tryActivate,
});

delay({
	source: tryActivate,
	timeout: 500,
	target: activateAccountModel.query.start,
});

const { userError, serverError, } = splitMap({
	source: activateAccountModel.query.finished.failure,
	cases: {
		userError: ({ error, }) => {
			if (isHttpErrorCode(error, 409)) {
				return 'already_activated';
			}
		},
		serverError: ({ error, }) => {
			return isHttpErrorCode(error, 500) ? 'server_error' : undefined;
		},
	},
});

sample({
	clock: userError,
	filter: hiddenRoute.$isOpened,
	fn: (error) =>
		({
			message: i18n.t(`errors.${error}`, { ns: 'activate', }),
			color: 'error',
		} as CreateSnackbarOptions),
	target: notificationsModel.create,
});

sample({
	clock: serverError,
	filter: hiddenRoute.$isOpened,
	fn: () =>
		({
			message: i18n.t('errors.default', { ns: 'common', }),
			color: 'error',
		} as CreateSnackbarOptions),
	target: notificationsModel.create,
});
