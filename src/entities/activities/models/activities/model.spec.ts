import { take, takeNested } from '@reatom/framework';
import { getDefaultInjector } from 'bunshi';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import {
	TestCtx,
	createTestCtx,
	defaultRoom,
	activities,
	actions,
	rooms
} from '~/test-utils';

// eslint-disable-next-line no-restricted-imports
import { roomModel } from '@/entities/rooms/@x/activities';

import { Molecule } from './model';
import { ActivitiesModel } from './types';

describe('entities/activitites/models/activities/model.ts', () => {
	const defaultRoomId = defaultRoom.id;

	let ctx: TestCtx;
	let model: ActivitiesModel;

	const createModel = (roomId = defaultRoomId) => {
		model = getDefaultInjector().get(Molecule, [roomModel.Scope, roomId]);
	};

	beforeEach(() => {
		ctx = createTestCtx();

		vi.useFakeTimers();
	});

	afterEach(async () => {
		await vi.runOnlyPendingTimersAsync();
		vi.useRealTimers();
	});

	test('should create signleton model for the same room', () => {
		createModel();

		const oldModel = model;

		createModel();

		expect(model).toBe(oldModel);
	});

	test('should create different models for different rooms', () => {
		createModel();

		const anotherModel = model;

		createModel(rooms[1].id);

		expect(model).not.toBe(anotherModel);
	});

	test('should load all activitites', async () => {
		createModel();

		const track = ctx.subscribeTrack(model.activititesAtom);

		await take(ctx, model.activititesAtom);

		expect(track.lastInput()).toStrictEqual(activities.slice(0, 50));
		expect(ctx.get(model.hasItemsAtom)).toBeTruthy();
		expect(ctx.get(model.pagesCountAtom)).toBe(2);

		track.unsubscribe();
	});

	test('should fetch new data on change params', async () => {
		createModel();

		const track = ctx.subscribeTrack(model.activititesAtom);

		await take(ctx, model.activititesAtom);

		await takeNested(ctx, model.changeFetchActivitiesParams, {
			actionIds: [actions[1].id],
		});

		await take(ctx, model.activititesAtom);

		const newActivities = activities
			.filter((activity) => activity.action.id === actions[1].id)
			.slice(0, 50);

		expect(track.lastInput()).toStrictEqual(newActivities);
		expect(ctx.get(model.hasItemsAtom)).toBe(!!newActivities.length);
		expect(ctx.get(model.pagesCountAtom)).toBe(2);

		track.unsubscribe();
	});

	test.skip('should refresh activities every 5 sec', async () => {
		createModel();

		const track = ctx.subscribeTrack(model.activititesAtom);

		await take(ctx, model.activititesAtom);

		const promise = take(ctx, model.activititesAtom);

		await vi.advanceTimersByTimeAsync(5000);

		await expect(promise).resolves.toStrictEqual(activities);

		track.unsubscribe();
	});
});
