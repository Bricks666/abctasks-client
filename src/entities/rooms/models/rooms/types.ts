import { Action, Atom } from '@reatom/framework';
import zod from 'zod';

import { createStandardResponseSchema } from '@/shared/lib';

import { Room, RoomId, roomSchema } from '../room';

export const roomsSchema = zod.array(roomSchema);
export const roomsResponseSchema = createStandardResponseSchema(roomsSchema);

export type Rooms = zod.infer<typeof roomsSchema>;

export interface RoomsModel {
	readonly roomsAtom: Atom<Rooms>;
	readonly pendingAtom: Atom<boolean>;
	readonly errorAtom: Atom<Error | null>;
	readonly refetch: Action;

	readonly add: Action<[room: Room], Rooms>;
	readonly update: Action<[room: Room], Rooms>;
	readonly remove: Action<[roomId: RoomId], Rooms>;
}
