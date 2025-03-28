import {
	action,
	atom,
	reatomResource,
	withCache,
	withDataAtom,
	withErrorAtom,
	withRetry
} from '@reatom/framework';
import { createMemStorage, reatomPersist } from '@reatom/persist';
import { createScope, molecule, use } from 'bunshi';

import { usersApi } from '@/shared/api';
import { constructName, mapStandardResponse } from '@/shared/lib';

import { FetchUsersParams, Users, UsersModel } from './types';


const modelName = 'users';

// eslint-disable-next-line @reatom/reatom-prefix-rule
const withPersist = reatomPersist(createMemStorage({ name: modelName, }));

export const Scope = createScope(undefined);

export const Molecule = molecule((): UsersModel => {
	use(Scope);

	const paramsAtom = atom<FetchUsersParams>(
		{},
		constructName(modelName, 'paramsAtom')
	);

	const fetch = reatomResource(
		(ctx) => {
			const params = ctx.spy(paramsAtom);

			return ctx.schedule(() => {
				return usersApi.getUsers(params, ctx.controller.signal);
			});
		},
		constructName(modelName, 'fetch')
	).pipe(
		withDataAtom([] as Users, mapStandardResponse),
		withCache({ withPersist, }),
		withRetry(),
		withErrorAtom(undefined, { initState: null, })
	);

	const changeParams = action(
		(ctx, params: FetchUsersParams) => {
			paramsAtom(ctx, params);
		},
		constructName(modelName, 'changeParams')
	);

	const { dataAtom: usersAtom, errorAtom, } = fetch;
	const pendingAtom = atom(
		(ctx) => !!ctx.spy(fetch.pendingAtom),
		constructName(modelName, 'pendingAtom')
	);

	return {
		usersAtom,
		pendingAtom,
		changeParams,
		errorAtom,
	};
});
