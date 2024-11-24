import {
	atom,
	onDisconnect,
	reatomResource,
	withCache,
	withDataAtom
} from '@reatom/framework';

import { activitiesApi } from '@/shared/api';
import {
	constructName,
	createSingletonFactory,
	mapStandardResponse
} from '@/shared/lib';

import { ActivitySpheres, ActivitySpheresModel } from './types';

const modelName = constructName('activitites', 'spheres');

export const create = createSingletonFactory(
	(): ActivitySpheresModel => {
		const getSpheres = reatomResource(async (ctx) => {
			return ctx.schedule(() => activitiesApi.getSpheres());
		}, constructName(modelName, 'getSpheres')).pipe(
			withDataAtom([] as ActivitySpheres, mapStandardResponse),
			withCache()
		);

		const pendingAtom = atom(
			(ctx) => !!ctx.spy(getSpheres.pendingAtom),
			constructName(modelName, 'pendingAtom')
		);

		return {
			spheresAtom: getSpheres.dataAtom,
			pendingAtom,
		};
	},
	{
		key: modelName,
		hooks: {
			staleOn: (result, stale) => onDisconnect(result.spheresAtom, stale),
		},
	}
);
