/* eslint-disable no-underscore-dangle */
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
import { molecule } from 'bunshi';

import { roomsApi } from '@/shared/api';
import { constructName, mapStandardResponse, retryQuery } from '@/shared/lib';

import { Room, RoomId } from '../room';

import { type Rooms, type RoomsModel, roomsResponseSchema } from './types';

const modelName = 'rooms';

const storage = createMemStorage({ name: modelName, });
// eslint-disable-next-line @reatom/reatom-prefix-rule
const withPersist = reatomPersist(storage);

export const Molecule = molecule((): RoomsModel => {
	const fetch = reatomResource(
		async (ctx) => {
			return ctx.schedule(() => {
				return roomsApi
					.getAll({ signal: ctx.controller.signal, })
					.then(roomsResponseSchema.parseAsync);
			});
		},
		constructName(modelName, 'fetch')
	).pipe(
		withDataAtom([] as Rooms, mapStandardResponse),
		withErrorAtom(undefined, { initState: null, }),
		withRetry(),
		withCache({ withPersist, })
	);

	const add = action(
		(ctx, room: Room) => {
			const rooms = ctx.get(roomsAtom);

			const roomsWithNewOne = [...rooms, room];

			storage.snapshotAtom(ctx, (snapshot) => {
				return {
					...snapshot,
					[fetch.__reatom.name!]: {
						...snapshot[fetch.__reatom.name!],
						data: roomsWithNewOne,
					},
				};
			});

			return roomsAtom(ctx, roomsWithNewOne);
		},
		constructName(modelName, 'add')
	);
	const update = action(
		(ctx, room: Room) => {
			const rooms = ctx.get(roomsAtom);

			const updatedRooms = rooms.map((oldRoom) =>
				oldRoom.id === room.id ? room : oldRoom
			);

			storage.snapshotAtom(ctx, (snapshot) => {
				return {
					...snapshot,
					[fetch.__reatom.name!]: {
						...snapshot[fetch.__reatom.name!],
						data: updatedRooms,
					},
				};
			});

			return roomsAtom(ctx, updatedRooms);
		},
		constructName(modelName, 'update')
	);
	const remove = action(
		(ctx, roomId: RoomId) => {
			const rooms = ctx.get(roomsAtom);

			const filteredRooms = rooms.filter((room) => room.id !== roomId);

			storage.snapshotAtom(ctx, (snapshot) => {
				return {
					...snapshot,
					[fetch.__reatom.name!]: {
						...snapshot[fetch.__reatom.name!],
						data: filteredRooms,
					},
				};
			});

			return roomsAtom(ctx, filteredRooms);
		},
		constructName(modelName, 'remove')
	);

	const pendingAtom = atom(
		(ctx) => {
			return !!ctx.spy(fetch.pendingAtom);
		},
		constructName(modelName, 'pendingAtom')
	);
	const { errorAtom, dataAtom: roomsAtom, retry: refetch, } = fetch;

	retryQuery({
		query: fetch,
		store: roomsAtom,
		timeout: 5000,
	});

	return {
		add,
		errorAtom,
		pendingAtom,
		refetch,
		remove,
		roomsAtom,
		update,
	};
});
