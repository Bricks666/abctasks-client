/* eslint-disable no-underscore-dangle */
import {
	reatomResource,
	withDataAtom,
	withErrorAtom,
	withRetry,
	withCache,
	action,
	atom
} from '@reatom/framework';
import { createMemStorage, reatomPersist } from '@reatom/persist';
import { molecule, use } from 'bunshi';

import { roomModel } from '@/entities/rooms/@x/tags';

import { tagsApi } from '@/shared/api';
import { constructName, mapStandardResponse, retryQuery } from '@/shared/lib';

import { Tag, TagId } from '../tag';

import { Tags, TagsModel, tagsResponseSchema } from './types';

const modelName = 'tags';

const storage = createMemStorage({ name: modelName, });
// eslint-disable-next-line @reatom/reatom-prefix-rule
const withPersist = reatomPersist(storage);

export const Molecule = molecule((): TagsModel => {
	const roomId = use(roomModel.Scope);

	const fetch = reatomResource(
		async (ctx) => {
			return ctx.schedule(() => {
				return tagsApi
					.getAll({ roomId, }, { signal: ctx.controller.signal, })
					.then(tagsResponseSchema.parseAsync);
			});
		},
		constructName(modelName, 'fetch')
	).pipe(
		withDataAtom([] as Tags, mapStandardResponse),
		withErrorAtom(undefined, { initState: null, }),
		withRetry(),
		withCache({ withPersist, })
	);

	const add = action(
		(ctx, tag: Tag) => {
			const tags = ctx.get(tagsAtom);

			const tagsWithNewOne = [...tags, tag];

			storage.snapshotAtom(ctx, (snapshot) => {
				return {
					...snapshot,
					[fetch.__reatom.name!]: {
						...snapshot[fetch.__reatom.name!],
						data: tagsWithNewOne,
					},
				};
			});

			return tagsAtom(ctx, tagsWithNewOne);
		},
		constructName(modelName, 'add')
	);
	const update = action(
		(ctx, tag: Tag) => {
			const tags = ctx.get(tagsAtom);

			const updatedTags = tags.map((oldTag) =>
				oldTag.id === tag.id ? tag : oldTag
			);

			storage.snapshotAtom(ctx, (snapshot) => {
				return {
					...snapshot,
					[fetch.__reatom.name!]: {
						...snapshot[fetch.__reatom.name!],
						data: updatedTags,
					},
				};
			});

			return tagsAtom(ctx, updatedTags);
		},
		constructName(modelName, 'update')
	);
	const remove = action(
		(ctx, tagId: TagId) => {
			const tags = ctx.get(tagsAtom);

			const filteredTags = tags.filter((tag) => tag.id !== tagId);

			storage.snapshotAtom(ctx, (snapshot) => {
				return {
					...snapshot,
					[fetch.__reatom.name!]: {
						...snapshot[fetch.__reatom.name!],
						data: filteredTags,
					},
				};
			});

			return tagsAtom(ctx, filteredTags);
		},
		constructName(modelName, 'remove')
	);

	const pendingAtom = atom(
		(ctx) => {
			return !!ctx.spy(fetch.pendingAtom);
		},
		constructName(modelName, 'pendingAtom')
	);
	const { errorAtom, dataAtom: tagsAtom, retry: refetch, } = fetch;

	retryQuery({
		query: fetch,
		store: tagsAtom,
		timeout: 5000,
	});

	return {
		add,
		errorAtom,
		pendingAtom,
		refetch,
		remove,
		tagsAtom,
		update,
	};
});
