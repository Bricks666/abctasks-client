import { atom, reatomAsync, withErrorAtom } from '@reatom/framework';
import { molecule } from 'bunshi';

import { authApi } from '@/shared/api';
import { constructName } from '@/shared/lib';

import { LogoutModel } from './types';

const modelName = 'logout';

export const Molecule = molecule((): LogoutModel => {
	// @todo Add clear of sessionModel
	const logout = reatomAsync(
		async () => {
			return authApi.logout();
		},
		constructName(modelName, 'logout')
	).pipe(withErrorAtom(undefined, { initState: null, }));

	const pendingAtom = atom(
		(ctx) => !!ctx.spy(logout.pendingAtom),
		constructName(modelName, 'pendingAtom')
	);

	return { logout, errorAtom: logout.errorAtom, pendingAtom, };
});
