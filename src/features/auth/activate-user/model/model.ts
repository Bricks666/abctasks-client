import {
	atom,
	onConnect,
	reatomAsync,
	withAbort,
	withDataAtom,
	withErrorAtom
} from '@reatom/framework';
import { urlAtom } from '@reatom/url';
import { molecule } from 'bunshi';

import { authApi } from '@/shared/api';
import {
	constructName,
	isHttpErrorCode,
	mapStandardResponse
} from '@/shared/lib';

import { type ActivateUserModel, responseSchema } from './types';

const modelName = 'activate-user';

export const Molecule = molecule((): ActivateUserModel => {
	const activate = reatomAsync(
		async (ctx, token: string) => {
			return authApi
				.activateUser({ token, }, { signal: ctx.controller.signal, })
				.then(responseSchema.parseAsync);
		},
		constructName(modelName, 'activate')
	).pipe(
		withDataAtom(false, mapStandardResponse),
		withErrorAtom(
			(ctx, error) => {
				if (isHttpErrorCode(error, 409)) {
					return 'already_activated';
				}

				return isHttpErrorCode(error, 500) ? 'server_error' : 'unknown';
			},
			{ initState: null, }
		),
		withAbort()
	);

	onConnect(activate.dataAtom, (ctx) => {
		// @todo should I directly take data from URL?
		const token = ctx.get(urlAtom).searchParams.get('token') as string;

		activate(ctx, token);

		return () => {
			activate.abort(ctx);
		};
	});

	const pendingAtom = atom(
		(ctx) => {
			return !!ctx.spy(activate.pendingAtom);
		},
		constructName(modelName, 'pendingAtom')
	);

	// @todo Add reaction on error with snacks
	const { dataAtom: activatedAtom, errorAtom, } = activate;

	return {
		activatedAtom,
		errorAtom,
		pendingAtom,
	};
});

// sample({
// 	clock: userError,
// 	filter: hiddenRoute.$isOpened,
// 	fn: (error) =>
// 		({
// 			message: i18n.t(`errors.${error}`, { ns: 'activate', }),
// 			color: 'error',
// 		} as CreateSnackbarOptions),
// 	target: notificationsModel.create,
// });

// sample({
// 	clock: serverError,
// 	filter: hiddenRoute.$isOpened,
// 	fn: () =>
// 		({
// 			message: i18n.t('errors.default', { ns: 'common', }),
// 			color: 'error',
// 		} as CreateSnackbarOptions),
// 	target: notificationsModel.create,
// });
