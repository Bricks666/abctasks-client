import { take } from '@reatom/framework';
import { getDefaultInjector } from 'bunshi';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import {
	TestCtx,
	createTestCtx,
	handlers,
	tags,
	server,
	waitNextTick,
	defaultTag
} from '~/test-utils';

import { roomModel } from '@/entities/rooms';

import { Molecule, Scope } from './model';
import { TagModel } from './types';

describe('entities/tags/models/tag/model.ts', () => {
	let ctx: TestCtx;
	let model: TagModel;

	const createModel = (tagId = defaultTag.id) => {
		model = getDefaultInjector().get(
			Molecule,
			[roomModel.Scope, defaultTag.roomId],
			[Scope, tagId]
		);
	};

	beforeEach(() => {
		ctx = createTestCtx();
	});

	test('should load tag by tagId', async () => {
		createModel();

		const track = ctx.subscribeTrack(model.tagAtom);

		expect(ctx.get(model.pendingAtom)).toBeTruthy();

		await waitNextTick();

		expect(track.lastInput()).toStrictEqual(defaultTag);
		expect(ctx.get(model.errorAtom)).toBeNull();
		expect(ctx.get(model.pendingAtom)).toBeFalsy();

		track.unsubscribe();
	});

	test('should save error if tag has not been found', async () => {
		createModel();

		server.use(handlers.tags.error.getOne.notFound);

		const track = ctx.subscribeTrack(model.tagAtom);

		await waitNextTick();

		expect(track.lastInput()).toBeNull();
		expect(ctx.get(model.errorAtom)).not.toBeNull();
		expect(ctx.get(model.pendingAtom)).toBeFalsy();

		track.unsubscribe();
	});

	test('should save error if something went wrong', async () => {
		createModel();

		server.use(handlers.tags.error.getOne.internalError);

		const track = ctx.subscribeTrack(model.tagAtom);

		await waitNextTick();

		expect(track.lastInput()).toBeNull();
		await expect(take(ctx, model.errorAtom)).resolves.not.toBeNull();
		expect(ctx.get(model.pendingAtom)).toBeFalsy();

		track.unsubscribe();
	});

	test('should save error if returned invalid data', async () => {
		createModel();

		server.use(handlers.tags.error.getOne.invalidData);

		const track = ctx.subscribeTrack(model.tagAtom);

		await waitNextTick();

		expect(track.lastInput()).toBeNull();
		expect(ctx.get(model.errorAtom)).not.toBeNull();
		expect(ctx.get(model.pendingAtom)).toBeFalsy();

		track.unsubscribe();
	});

	test('should refetch query every 5 seconds', async () => {
		vi.useFakeTimers();

		createModel();

		server.use(handlers.tags.error.getOne.invalidData);

		const track = ctx.subscribeTrack(model.tagAtom);

		await vi.advanceTimersByTimeAsync(5000);

		expect(track.lastInput()).toBeNull();
		expect(ctx.get(model.errorAtom)).not.toBeNull();
		expect(ctx.get(model.pendingAtom)).toBeFalsy();

		track.unsubscribe();

		await vi.runOnlyPendingTimersAsync();
		vi.useRealTimers();
	});

	test('should creaet different instance for different tag ids', async () => {
		createModel();

		const oldModel = model;

		createModel({ tagId: tags[1].id, });

		expect(model).not.toBe(oldModel);
	});
});
