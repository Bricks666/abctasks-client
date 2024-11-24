import {
	withDataAtom,
	withCache,
	atom,
	onDisconnect,
	withRetry,
	reatomAsync,
	onConnect,
	withAbort
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

const modelName = constructName('activitites', 'in-room');

export const create = createSingletonFactory(
	(params: CreateActivitiesModelParams): ActivitiesModel => {
		const { roomId, } = params;

		const fetch = reatomAsync(async (ctx, params?: FetchActivititesParams) => {
			return ctx.schedule(() =>
				activitiesApi.getAll({ ...params, roomId, }, ctx.controller.signal)
			);
		}, constructName(modelName, 'fetch')).pipe(
			withDataAtom(
				{ items: [], totalCount: 0, limit: 50, } as PaginationResponse<Activity>,
				mapStandardResponse
			),
			withCache(),
			withRetry(),
			withAbort()
		);

		const pendingAtom = atom(
			(ctx) => !!ctx.spy(fetch.pendingAtom),
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

		const pagesCountAtom = atom((ctx) => {
			const { limit, totalCount, } = ctx.spy(fetch.dataAtom);

			return Math.ceil(totalCount / limit);
		}, constructName(modelName, 'pagesCountAtom'));

		onConnect(fetch.dataAtom, (ctx) => {
			fetch(ctx);

			return () => fetch.abort(ctx);
		});

		retryQuery({
			query: fetch,
			store: activititesAtom,
			timeout: 5000,
		});

		return {
			fetch,
			activititesAtom,
			pagesCountAtom,
			hasItemsAtom,
			pendingAtom,
		};
	},
	{
		key: (params) => constructName(modelName, params.roomId.toString()),
		hooks: {
			staleOn: (result, stale) => onDisconnect(result.activititesAtom, stale),
		},
	}
);
