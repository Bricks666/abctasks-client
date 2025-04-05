import { take } from '@reatom/framework';
import { getDefaultInjector } from 'bunshi';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import {
	TestCtx,
	createTestCtx,
	defaultRoom,
	handlers,
	members,
	rooms,
	server
} from '~/test-utils';

import { Molecule, Scope } from './model';
import { MembersModel } from './types';


describe('src/entities/users/models/members/model.ts', () => {
	let ctx: TestCtx;
	let model: MembersModel;

	const createModel = (roomId = defaultRoom.id) => {
		model = getDefaultInjector().get(Molecule, [Scope, roomId]);
	};

	beforeEach(() => {
		ctx = createTestCtx();

		vi.useFakeTimers();
	});

	afterEach(async () => {
		await vi.runOnlyPendingTimersAsync();

		vi.useRealTimers();
	});

	test('should create the same model for the same room id', () => {
		createModel();

		const anotherModel = model;

		createModel();

		expect(anotherModel).toBe(model);
	});

	test('should create different models for different room ids', () => {
		createModel();

		const anotherModel = model;

		createModel(rooms[1].id);

		expect(anotherModel).not.toBe(model);
	});

	test('should load members for passed room', async () => {
		createModel();

		const track = ctx.subscribeTrack(model.membersAtom);

		await expect(take(ctx, model.membersAtom)).resolves.toStrictEqual(members);

		track.unsubscribe();
	});

	test('should load indicate if members is being loaded', async () => {
		createModel();

		const track = ctx.subscribeTrack(model.membersAtom);

		expect(ctx.get(model.pendingAtom)).toBe(true);

		await take(ctx, model.membersAtom);

		expect(ctx.get(model.pendingAtom)).toBe(false);

		track.unsubscribe();
	});

	test('should store error during loading', async () => {
		createModel();

		server.use(handlers.members.error.members);

		const track = ctx.subscribeTrack(model.membersAtom);

		await expect(take(ctx, model.errorAtom)).resolves.toBeInstanceOf(Error);

		track.unsubscribe();
	});
});
