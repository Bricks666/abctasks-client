import {
	atom,
	reatomResource,
	withCache,
	withDataAtom,
	withErrorAtom,
	withRetry
} from '@reatom/framework';
import { createMemStorage, reatomPersist } from '@reatom/persist';
import { molecule } from 'bunshi';

import { activitiesApi } from '@/shared/api';
import { constructName, mapStandardResponse } from '@/shared/lib';

import {
	ActivityActions,
	ActivityActionsModel,
	activityActionsResponseSchema
} from './types';


const modelName = constructName('activitites', 'actions');

// eslint-disable-next-line @reatom/reatom-prefix-rule
const withPersist = reatomPersist(createMemStorage({ name: modelName, }));

export const Molecule = molecule((): ActivityActionsModel => {
	const fetch = reatomResource(
		async (ctx) => {
			return ctx.schedule(() =>
				activitiesApi
					.getActions({ signal: ctx.controller.signal, })
					.then(activityActionsResponseSchema.parseAsync)
			);
		},
		constructName(modelName, 'fetch')
	).pipe(
		withDataAtom([] as ActivityActions, mapStandardResponse),
		withCache({ withPersist, }),
		withRetry(),
		withErrorAtom(undefined, { initState: null, })
	);

	const { errorAtom, dataAtom: actionsAtom, } = fetch;
	const pendingAtom = atom(
		(ctx) => !!ctx.spy(fetch.pendingAtom),
		constructName(modelName, 'pendingAtom')
	);

	return {
		actionsAtom,
		errorAtom,
		pendingAtom,
	};
});
