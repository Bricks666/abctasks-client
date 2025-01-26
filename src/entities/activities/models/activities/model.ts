import {
	withDataAtom,
	withCache,
	atom,
	onDisconnect,
	withRetry,
	withErrorAtom,
	reatomRecord,
	reatomResource,
	action,
	withStatusesAtom
} from '@reatom/framework';

import { activitiesApi } from '@/shared/api';
import {
	constructName,
	createSingletonFactory,
	mapStandardResponse,
	retryQuery
} from '@/shared/lib';
import { PaginationResponse } from '@/shared/types';

import {
	ActivitiesModel,
	Activity,
	CreateActivitiesModelParams,
	FetchActivititesParams
} from './types';

const modelName = 'list';

export const create = createSingletonFactory(
	(params: CreateActivitiesModelParams): ActivitiesModel => {
		const { name, roomId, count = 50, } = params;

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
			},
			constructName(name, modelName, 'paramsAtom')
		);

		/**
		 * @todo Add `zod` validation
		 */
		const fetch = reatomResource(
			async (ctx) => {
				const params = ctx.spy(paramsAtom);

				return ctx.schedule(() =>
					activitiesApi.getAll(
						{ ...params, roomId, count, },
						ctx.controller.signal
					)
				);
			},
			constructName(name, modelName, 'fetch')
		).pipe(
			withDataAtom(
				{ items: [], totalCount: 0, limit: 50, } as PaginationResponse<Activity>,
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
			constructName(name, modelName, 'changeFetchActivitiesParams')
		);

		const pendingAtom = atom(
			(ctx) => ctx.spy(fetch.statusesAtom).isFirstPending,
			constructName(name, modelName, 'pendingAtom')
		);
		const activititesAtom = atom(
			(ctx) => ctx.spy(fetch.dataAtom).items,
			constructName(name, modelName, 'activititesAtom')
		);
		const hasItemsAtom = atom(
			(ctx) => !!ctx.spy(fetch.dataAtom).totalCount,
			constructName(name, modelName, 'hasItemsAtom')
		);
		const pagesCountAtom = atom(
			(ctx) => {
				const { limit, totalCount, } = ctx.spy(fetch.dataAtom);

				return Math.ceil(totalCount / limit);
			},
			constructName(name, modelName, 'pagesCountAtom')
		);

		retryQuery({
			query: fetch,
			store: activititesAtom,
			timeout: 5000,
		});

		const { retry: refetch, } = fetch;

		return {
			changeFetchActivitiesParams,
			activititesAtom,
			pagesCountAtom,
			hasItemsAtom,
			pendingAtom,
			refetch,
			errorAtom: fetch.errorAtom,
		};
	},
	{
		key: (params) => constructName(modelName, params.roomId.toString()),
		hooks: {
			staleOn: (result, stale) => onDisconnect(result.activititesAtom, stale),
		},
	}
);
