import { take } from '@reatom/framework';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { create } from './model';
import { MembersModel } from './types';

import {
	TestCtx,
	createTestCtx,
	defaultRoom,
	handlers,
	members,
	server
} from '~/test-utils';

describe('src/entities/users/models/members/model', () => {
	let ctx: TestCtx;
	let model: MembersModel;

	const createModel = () => {
		model = create({ roomId: defaultRoom.id, });
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

		const anotherModel = create({ roomId: defaultRoom.id, });

		expect(anotherModel).toBe(model);
	});

	test('should create different models for different room ids', () => {
		createModel();

		const anotherModel = create({ roomId: 2, });

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
