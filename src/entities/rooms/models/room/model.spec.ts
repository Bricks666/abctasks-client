import { take } from '@reatom/framework';
import { getDefaultInjector } from 'bunshi';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import {
	TestCtx,
	createTestCtx,
	defaultRoom,
	handlers,
	rooms,
	server,
	waitNextTick
} from '~/test-utils';

import { RoomMolecule, RoomScope } from './model';
import type { RoomModel } from './types';

describe('entieies/rooms/models/room/model.ts', () => {
	let ctx: TestCtx;
	let model: RoomModel;

	const createModel = (roomId = defaultRoom.id) => {
		model = getDefaultInjector().get(RoomMolecule, [RoomScope, roomId]);
	};

	beforeEach(() => {
		ctx = createTestCtx();
	});

	test('should load room by roomId', async () => {
		createModel();

		const track = ctx.subscribeTrack(model.roomAtom);

		expect(ctx.get(model.pendingAtom)).toBeTruthy();

		await waitNextTick();

		expect(track.lastInput()).toStrictEqual(defaultRoom);
		expect(ctx.get(model.errorAtom)).toBeNull();
		expect(ctx.get(model.pendingAtom)).toBeFalsy();

		track.unsubscribe();
	});

	test('should save error if room has not been found', async () => {
		createModel();

		server.use(handlers.rooms.error.getOne.notFound);

		const track = ctx.subscribeTrack(model.roomAtom);

		await waitNextTick();

		expect(track.lastInput()).toBeNull();
		expect(ctx.get(model.errorAtom)).not.toBeNull();
		expect(ctx.get(model.pendingAtom)).toBeFalsy();

		track.unsubscribe();
	});

	test('should save error if something went wrong', async () => {
		createModel();

		server.use(handlers.rooms.error.getOne.internalError);

		const track = ctx.subscribeTrack(model.roomAtom);

		await waitNextTick();

		expect(track.lastInput()).toBeNull();
		await expect(take(ctx, model.errorAtom)).resolves.not.toBeNull();
		expect(ctx.get(model.pendingAtom)).toBeFalsy();

		track.unsubscribe();
	});

	test('should save error if returned invalid data', async () => {
		createModel();

		server.use(handlers.rooms.error.getOne.invalidData);

		const track = ctx.subscribeTrack(model.roomAtom);

		await waitNextTick();

		expect(track.lastInput()).toBeNull();
		expect(ctx.get(model.errorAtom)).not.toBeNull();
		expect(ctx.get(model.pendingAtom)).toBeFalsy();

		track.unsubscribe();
	});

	test('should refetch query every 5 seconds', async () => {
		vi.useFakeTimers();

		createModel();

		server.use(handlers.rooms.error.getOne.invalidData);

		const track = ctx.subscribeTrack(model.roomAtom);

		await vi.advanceTimersByTimeAsync(5000);

		expect(track.lastInput()).toBeNull();
		expect(ctx.get(model.errorAtom)).not.toBeNull();
		expect(ctx.get(model.pendingAtom)).toBeFalsy();

		track.unsubscribe();

		await vi.runOnlyPendingTimersAsync();
		vi.useRealTimers();
	});

	test('should creaet different instance for different room ids', async () => {
		createModel();

		const oldModel = model;

		createModel({ roomId: rooms[1].id, });

		expect(model).not.toBe(oldModel);
	});
});
