import {
	atom,
	reatomResource,
	withCache,
	withDataAtom,
	withErrorAtom
} from '@reatom/framework';
import { createMemStorage, reatomPersist } from '@reatom/persist';
import { createScope, molecule, use } from 'bunshi';

import { roomModel } from '@/entities/rooms/@x/tags';

import { tagsApi } from '@/shared/api';
import { constructName, mapStandardResponse } from '@/shared/lib';

import { Tag, TagId, TagModel, tagResponseSchema } from './types';

export const Scope = createScope<TagId>(-1);

const modelName = 'tag';

const storage = createMemStorage({ name: modelName, });
// eslint-disable-next-line @reatom/reatom-prefix-rule
const withPersist = reatomPersist(storage);

export const Molecule = molecule((): TagModel => {
	const roomId = use(roomModel.Scope);
	const tagId = use(Scope);

	const fetch = reatomResource(
		async (ctx) => {
			return ctx.schedule(() => {
				return tagsApi
					.getOne({ id: tagId, roomId, })
					.then(tagResponseSchema.parseAsync);
			});
		},
		constructName(modelName, roomId, tagId)
	).pipe(
		withDataAtom(null as null | Tag, mapStandardResponse),
		withErrorAtom(undefined, { initState: null, }),
		withCache({ withPersist, })
	);

	const { dataAtom: tagAtom, errorAtom, } = fetch;
	const pendingAtom = atom(
		(ctx) => !!ctx.spy(fetch.pendingAtom),
		constructName(modelName, 'pendingAtom')
	);

	return {
		tagAtom,
		errorAtom,
		pendingAtom,
	};
});
