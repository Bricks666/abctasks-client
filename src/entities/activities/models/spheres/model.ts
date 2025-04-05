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
	ActivitySpheres,
	ActivitySpheresModel,
	activitySpheresResponseSchema
} from './types';

const modelName = constructName('activitites', 'spheres');

// eslint-disable-next-line @reatom/reatom-prefix-rule
const withPersist = reatomPersist(createMemStorage({ name: modelName, }));

export const Molecule = molecule((): ActivitySpheresModel => {
	const fetch = reatomResource(
		async (ctx) => {
			return ctx.schedule(() =>
				activitiesApi
					.getSpheres({ signal: ctx.controller.signal, })
					.then(activitySpheresResponseSchema.parseAsync)
			);
		},
		constructName(modelName, 'fetch')
	).pipe(
		withDataAtom([] as ActivitySpheres, mapStandardResponse),
		withCache({ withPersist, }),
		withRetry(),
		withErrorAtom(undefined, { initState: null, })
	);

	const { dataAtom: spheresAtom, errorAtom, } = fetch;

	const pendingAtom = atom(
		(ctx) => !!ctx.spy(fetch.pendingAtom),
		constructName(modelName, 'pendingAtom')
	);

	return {
		spheresAtom,
		errorAtom,
		pendingAtom,
	};
});
