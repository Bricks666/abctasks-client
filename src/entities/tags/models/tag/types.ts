import { Atom } from '@reatom/framework';
import zod from 'zod';

import { createStandardResponseSchema } from '@/shared/lib';

export const tagSchema = zod
	.object({
		id: zod.number(),
		roomId: zod.number(),
		name: zod.string(),
		mainColor: zod.string(),
		secondColor: zod.string(),
	})
	.readonly();

export const tagResponseSchema = createStandardResponseSchema(tagSchema);

export type Tag = zod.infer<typeof tagSchema>;
export type TagId = Tag['id'];

export interface TagModel {
	readonly tagAtom: Atom<Tag | null>;
	readonly errorAtom: Atom<Error | null>;
	readonly pendingAtom: Atom<boolean>;
}
