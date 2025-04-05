import { Action, Atom } from '@reatom/framework';
import zod from 'zod';

import { createStandardResponseSchema } from '@/shared/lib';

import { Tag, TagId, tagSchema } from '../tag';

export const tagsSchema = zod.array(tagSchema).readonly();
export const tagsResponseSchema = createStandardResponseSchema(tagsSchema);

export type Tags = zod.infer<typeof tagsSchema>;

export interface TagsModel {
	readonly tagsAtom: Atom<Tags>;

	readonly pendingAtom: Atom<boolean>;
	readonly errorAtom: Atom<Error | null>;
	readonly refetch: Action;

	readonly add: Action<[tag: Tag], Tags>;
	readonly update: Action<[tag: Tag], Tags>;
	readonly remove: Action<[tagId: TagId], Tags>;
}
