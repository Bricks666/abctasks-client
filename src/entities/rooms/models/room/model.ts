import {
	atom,
	onDisconnect,
	reatomResource,
	withCache,
	withDataAtom,
	withErrorAtom,
	withRetry
} from '@reatom/framework';
import { createMemStorage, reatomPersist } from '@reatom/persist';

import { roomsApi } from '@/shared/api';
import {
	constructName,
	createSingletonFactory,
	mapStandardResponse,
	retryQuery
} from '@/shared/lib';

import {
	CreateRoomModelParams,
	Room,
	RoomModel,
	roomResponseSchema
} from './types';

const modelName = 'room';

const storage = createMemStorage({ name: modelName, });
// eslint-disable-next-line @reatom/reatom-prefix-rule
const withPersist = reatomPersist(storage);

export const create = createSingletonFactory(
	(params: CreateRoomModelParams): RoomModel => {
		const { roomId, } = params;

		const fetch = reatomResource(
			async (ctx) => {
				return ctx.schedule(() => {
					return roomsApi
						.getOne({ roomId, }, { signal: ctx.controller.signal, })
						.then(roomResponseSchema.parseAsync);
				});
			},
			constructName(modelName, roomId.toString(), 'fetch')
		).pipe(
			withDataAtom(null as Room | null, mapStandardResponse),
			withErrorAtom(undefined, { initState: null, }),
			withCache({ withPersist, }),
			withRetry()
		);

		const { dataAtom: roomAtom, errorAtom, } = fetch;
		const pendingAtom = atom(
			(ctx) => {
				return !!ctx.spy(fetch.pendingAtom);
			},
			constructName(modelName, roomId.toString(), 'pendingAtom')
		);

		retryQuery({
			query: fetch,
			store: roomAtom,
			timeout: 5000,
		});

		return {
			errorAtom,
			pendingAtom,
			roomAtom,
		};
	},
	{
		key: (params) =>
			constructName(modelName, params.name, params.roomId.toString()),
		hooks: {
			staleOn: (result, stale) => onDisconnect(result.roomAtom, stale),
		},
	}
);
