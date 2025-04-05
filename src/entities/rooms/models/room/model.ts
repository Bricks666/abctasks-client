import {
	atom,
	reatomResource,
	withCache,
	withDataAtom,
	withErrorAtom,
	withRetry
} from '@reatom/framework';
import { createMemStorage, reatomPersist } from '@reatom/persist';
import { createScope, molecule, use } from 'bunshi';

import { roomsApi } from '@/shared/api';
import { constructName, mapStandardResponse, retryQuery } from '@/shared/lib';

import {
	type Room,
	type RoomId,
	type RoomModel,
	roomResponseSchema
} from './types';

export const Scope = createScope<RoomId>(-1);

const modelName = 'room';

const storage = createMemStorage({ name: modelName, });
// eslint-disable-next-line @reatom/reatom-prefix-rule
const withPersist = reatomPersist(storage);

export const Molecule = molecule((): RoomModel => {
	const roomId = use(Scope);

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
});
