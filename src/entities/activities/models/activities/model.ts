import {
	withDataAtom,
	withCache,
	atom,
	withRetry,
	withErrorAtom,
	reatomRecord,
	reatomResource,
	action,
	withStatusesAtom
} from '@reatom/framework';
import { molecule, use } from 'bunshi';

import { roomModel } from '@/entities/rooms/@x/activities';

import { activitiesApi } from '@/shared/api';
import { constructName, mapStandardResponse, retryQuery } from '@/shared/lib';
import { Paginated } from '@/shared/types';

import {
	ActivitiesModel,
	Activity,
	FetchActivititesParams,
	acitivitiesResponseSchema
} from './types';

const modelName = 'list';

export const Molecule = molecule((): ActivitiesModel => {
	const roomId = use(roomModel.Scope);

	const paramsAtom = reatomRecord<FetchActivititesParams>(
		{
			page: 1,
			actionIds: [],
			activistIds: [],
			after: null,
			before: null,
			by: null,
			sphereIds: [],
			type: null,
			count: 50,
		},
		constructName(modelName, 'paramsAtom')
	);

	const fetch = reatomResource(
		async (ctx) => {
			const params = ctx.spy(paramsAtom);

			return ctx.schedule(() =>
				activitiesApi
					.getAll({ ...params, roomId, }, { signal: ctx.controller.signal, })
					.then(acitivitiesResponseSchema.parseAsync)
			);
		},
		constructName(modelName, 'fetch')
	).pipe(
		withDataAtom(
			{ items: [], totalCount: 0, limit: 50, } as Paginated<Activity>,
			mapStandardResponse
		),
		withCache(),
		withRetry(),
		withStatusesAtom(),
		withErrorAtom(undefined, { initState: null, })
	);

	const changeFetchActivitiesParams = action(
		(ctx, params: FetchActivititesParams) => {
			if ('page' in params) {
				return paramsAtom.merge(ctx, params);
			}

			return paramsAtom.merge(ctx, { ...params, page: 1, });
		},
		constructName(modelName, 'changeFetchActivitiesParams')
	);

	const pendingAtom = atom(
		(ctx) => ctx.spy(fetch.statusesAtom).isFirstPending,
		constructName(modelName, 'pendingAtom')
	);
	const activititesAtom = atom(
		(ctx) => ctx.spy(fetch.dataAtom).items,
		constructName(modelName, 'activititesAtom')
	);
	const hasItemsAtom = atom(
		(ctx) => !!ctx.spy(fetch.dataAtom).totalCount,
		constructName(modelName, 'hasItemsAtom')
	);
	const pagesCountAtom = atom(
		(ctx) => {
			const { limit, totalCount, } = ctx.spy(fetch.dataAtom);

			return Math.ceil(totalCount / limit);
		},
		constructName(modelName, 'pagesCountAtom')
	);

	retryQuery({
		query: fetch,
		store: activititesAtom,
		timeout: 5000,
	});

	const { retry: refetch, errorAtom, } = fetch;

	return {
		changeFetchActivitiesParams,
		activititesAtom,
		pagesCountAtom,
		hasItemsAtom,
		pendingAtom,
		refetch,
		errorAtom,
	};
});
