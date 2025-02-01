import { noop, take } from '@reatom/framework';
import { beforeEach, describe, expect, test } from 'vitest';

import {
	TestCtx,
	createTestCtx,
	defaultUser,
	handlers,
	rooms,
	server,
	waitNextTick
} from '~/test-utils';

import { Room } from '../room';

import { create } from './model';
import { RoomsModel } from './types';

describe('entities/rooms/model/rooms/model.ts', () => {
	let ctx: TestCtx;
	let model: RoomsModel;

	const createModel = () => {
		model = create();
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

	test('should load rooms', async () => {
		createModel();

		const track = ctx.subscribeTrack(model.roomsAtom);

		expect(ctx.get(model.pendingAtom)).toBeTruthy();

		await waitNextTick();

		expect(track.lastInput()).toStrictEqual(rooms);
		expect(ctx.get(model.errorAtom)).toBeNull();
		expect(ctx.get(model.pendingAtom)).toBeFalsy();

		track.unsubscribe();
	});

	test('should set error if something happened', async () => {
		createModel();

		server.use(handlers.rooms.error.getAll.internalError);

		const track = ctx.subscribeTrack(model.roomsAtom);

		await waitNextTick();

		expect(track.lastInput()).toStrictEqual([]);
		await expect(take(ctx, model.errorAtom)).resolves.not.toBeNull();
		expect(ctx.get(model.pendingAtom)).toBeFalsy();

		track.unsubscribe();
	});

	test('should not set data if invalid shape have been loaded', async () => {
		createModel();

		server.use(handlers.rooms.error.getAll.invalidData);

		const track = ctx.subscribeTrack(model.roomsAtom);

		await waitNextTick();

		expect(track.lastInput()).toStrictEqual([]);
		expect(ctx.get(model.errorAtom)).not.toBeNull();
		expect(ctx.get(model.pendingAtom)).toBeFalsy();

		track.unsubscribe();
	});

	test.todo('should refetch each 5 seconds');

	test('should keep cache across models', async () => {
		createModel();

		const track = ctx.subscribeTrack(model.roomsAtom);

		await waitNextTick();

		track.unsubscribe();

		createModel();

		expect(ctx.get(model.roomsAtom)).toStrictEqual(rooms);
	});

	test('should refetch', async () => {
		createModel();

		const track = ctx.subscribeTrack(model.roomsAtom);

		await waitNextTick();

		const promise = model.refetch(ctx).catch(noop);

		expect(ctx.get(model.pendingAtom)).toBeFalsy();

		await promise;

		expect(track.lastInput()).toStrictEqual(rooms);
		expect(ctx.get(model.errorAtom)).toBeNull();

		track.unsubscribe();
	});

	test('should keep data if refetch was unsuccessful', async () => {
		createModel();

		const track = ctx.subscribeTrack(model.roomsAtom);

		await waitNextTick();

		server.use(handlers.rooms.error.getAll.invalidData);

		await model.refetch(ctx).catch(noop);

		expect(track.lastInput()).toStrictEqual(rooms);
		await expect(take(ctx, model.errorAtom)).resolves.not.toBeNull();

		track.unsubscribe();
	});

	test('should add room into list', async () => {
		createModel();

		const track = ctx.subscribeTrack(model.roomsAtom);

		await waitNextTick();

		const room: Room = {
			id: rooms[1].id + 1,
			ownerId: defaultUser.id,
			name: 'new room',
			description: 'description',
			canChange: true,
		};

		model.add(ctx, room);

		expect(track.lastInput()).toStrictEqual([...rooms, room]);

		track.unsubscribe();
	});

	test('should update room in list', async () => {
		createModel();

		const track = ctx.subscribeTrack(model.roomsAtom);

		await waitNextTick();

		const room: Room = {
			...rooms[1],
			name: 'new room',
		};

		model.update(ctx, room);

		expect(track.lastInput()).toStrictEqual(rooms.toSpliced(1, 1, room));

		track.unsubscribe();
	});

	test('should remove room from list', async () => {
		createModel();

		const track = ctx.subscribeTrack(model.roomsAtom);

		await waitNextTick();

		model.remove(ctx, rooms[1].id);

		expect(track.lastInput()).toStrictEqual(rooms.toSpliced(1, 1));

		track.unsubscribe();
	});
});
