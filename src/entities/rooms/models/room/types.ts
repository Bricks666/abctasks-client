import { Atom } from '@reatom/framework';
import zod from 'zod';

import { userIdSchema } from '@/entities/users/@x/rooms';

import { createStandardResponseSchema } from '@/shared/lib';

export const roomSchema = zod
	.object({
		id: zod.number(),
		ownerId: userIdSchema,
		name: zod.string(),
		description: zod.string(),
		/**
		 * @deprecated. This property will be reworked in new permissions model
		 */
		canChange: zod.boolean().nullable().optional(),
	})
	.readonly();
export const roomResponseSchema = createStandardResponseSchema(roomSchema);
export const roomIdSchema = roomSchema.unwrap().shape.id;

export interface Room extends zod.infer<typeof roomSchema> {}
export type RoomId = Room['id'];

export interface CreateRoomModelParams {
	// May be atom?
	readonly roomId: RoomId;
}

export interface RoomModel {
	readonly roomAtom: Atom<Room | null>;
	readonly errorAtom: Atom<Error | null>;
	readonly pendingAtom: Atom<boolean>;
}
