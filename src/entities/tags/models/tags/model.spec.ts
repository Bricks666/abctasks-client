import { noop, take } from '@reatom/framework';
import { getDefaultInjector } from 'bunshi';
import { beforeEach, describe, expect, test } from 'vitest';

import {
	type TestCtx,
	createTestCtx,
	handlers,
	tags,
	server,
	waitNextTick,
	defaultRoom
} from '~/test-utils';

// eslint-disable-next-line no-restricted-imports
import { roomModel } from '@/entities/rooms/@x/tags';

import type { Tag } from '../tag';

import { Molecule } from './model';
import type { TagsModel } from './types';

describe('entities/tags/model/tags/model.ts', () => {
	let ctx: TestCtx;
	let model: TagsModel;
	const roomId = defaultRoom.id;

	const createModel = () => {
		model = getDefaultInjector().get(Molecule, [roomModel.Scope, roomId]);
	};

	beforeEach(() => {
		ctx = createTestCtx();
	});

	test('should be the same model across creations', () => {
		createModel();

		const oldModel = model;

		createModel();

		expect(model).toBe(oldModel);
	});

	test('should load tags', async () => {
		createModel();

		const track = ctx.subscribeTrack(model.tagsAtom);

		expect(ctx.get(model.pendingAtom)).toBeTruthy();

		await waitNextTick();

		expect(track.lastInput()).toStrictEqual(tags);
		expect(ctx.get(model.errorAtom)).toBeNull();
		expect(ctx.get(model.pendingAtom)).toBeFalsy();

		track.unsubscribe();
	});

	test('should set error if something happened', async () => {
		createModel();

		server.use(handlers.tags.error.getAll.internalError);

		const track = ctx.subscribeTrack(model.tagsAtom);

		await waitNextTick();

		expect(track.lastInput()).toStrictEqual([]);
		await expect(take(ctx, model.errorAtom)).resolves.not.toBeNull();
		expect(ctx.get(model.pendingAtom)).toBeFalsy();

		track.unsubscribe();
	});

	test('should not set data if invalid shape have been loaded', async () => {
		createModel();

		server.use(handlers.tags.error.getAll.invalidData);

		const track = ctx.subscribeTrack(model.tagsAtom);

		await waitNextTick();

		expect(track.lastInput()).toStrictEqual([]);
		expect(ctx.get(model.errorAtom)).not.toBeNull();
		expect(ctx.get(model.pendingAtom)).toBeFalsy();

		track.unsubscribe();
	});

	test.todo('should refetch each 5 seconds');

	test('should keep cache across models', async () => {
		createModel();

		const track = ctx.subscribeTrack(model.tagsAtom);

		await waitNextTick();

		track.unsubscribe();

		model = null;

		await waitNextTick();

		createModel();

		expect(ctx.get(model.tagsAtom)).toStrictEqual(tags);
	});

	test('should refetch', async () => {
		createModel();

		const track = ctx.subscribeTrack(model.tagsAtom);

		await waitNextTick();

		const promise = model.refetch(ctx).catch(noop);

		expect(ctx.get(model.pendingAtom)).toBeFalsy();

		await promise;

		expect(track.lastInput()).toStrictEqual(tags);
		expect(ctx.get(model.errorAtom)).toBeNull();

		track.unsubscribe();
	});

	test('should keep data if refetch was unsuccessful', async () => {
		createModel();

		const track = ctx.subscribeTrack(model.tagsAtom);

		await waitNextTick();

		server.use(handlers.tags.error.getAll.invalidData);

		await model.refetch(ctx).catch(noop);

		expect(track.lastInput()).toStrictEqual(tags);
		await expect(take(ctx, model.errorAtom)).resolves.not.toBeNull();

		track.unsubscribe();
	});

	test('should add tag into list', async () => {
		createModel();

		const track = ctx.subscribeTrack(model.tagsAtom);

		await waitNextTick();

		const tag: Tag = {
			id: tags[1].id + 1,
			roomId,
			name: 'new tag',
			mainColor: '#895467',
			secondColor: '#895467',
		};

		model.add(ctx, tag);

		expect(track.lastInput()).toStrictEqual([...tags, tag]);

		track.unsubscribe();
	});

	test('should update tag in list', async () => {
		createModel();

		const track = ctx.subscribeTrack(model.tagsAtom);

		await waitNextTick();

		const tag: Tag = {
			...tags[1],
			name: 'new tag',
		};

		model.update(ctx, tag);

		expect(track.lastInput()).toStrictEqual(tags.toSpliced(1, 1, tag));

		track.unsubscribe();
	});

	test('should remove tag from list', async () => {
		createModel();

		const track = ctx.subscribeTrack(model.tagsAtom);

		await waitNextTick();

		model.remove(ctx, tags[1].id);

		expect(track.lastInput()).toStrictEqual(tags.toSpliced(1, 1));

		track.unsubscribe();
	});
});
