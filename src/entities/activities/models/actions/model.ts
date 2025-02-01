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

import {
	ActivityActions,
	ActivityActionsModel,
	activityActionsResponseSchema
} from './types';

const modelName = constructName('activitites', 'actions');

export const create = createSingletonFactory(
	(): ActivityActionsModel => {
		const getActions = reatomResource(
			async (ctx) => {
				return ctx.schedule(() =>
					activitiesApi
						.getActions({ signal: ctx.controller.signal, })
						.then(activityActionsResponseSchema.parseAsync)
				);
			},
			constructName(modelName, 'getActions')
		).pipe(
			withDataAtom([] as ActivityActions, mapStandardResponse),
			withCache()
		);

		const pendingAtom = atom(
			(ctx) => !!ctx.spy(getActions.pendingAtom),
			constructName(modelName, 'pendingAtom')
		);

		return {
			actionsAtom: getActions.dataAtom,
			pendingAtom,
		};
	},
	{
		key: modelName,
		hooks: {
			staleOn: (result, stale) => onDisconnect(result.actionsAtom, stale),
		},
	}
);
