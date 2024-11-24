import { take, takeNested } from '@reatom/framework';
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

import { create } from './model';
import { ActivitiesModel } from './types';

import {
	TestCtx,
	createTestCtx,
	defaultRoom,
	activities,
	actions,
	rooms
} from '~/test-utils';

describe('src/entities/activitites/models/activities/model', () => {
	const defaultRoomId = defaultRoom.id;

	let ctx: TestCtx;
	let model: ActivitiesModel;

	const createModel = (roomId = defaultRoomId) => {
		model = create({ roomId, });
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

		const anotherModel = create({ roomId: defaultRoomId, });

		expect(model).toBe(anotherModel);
	});

	test('should create different models for different rooms', () => {
		createModel();

		const anotherModel = create({ roomId: rooms[1].id, });

		expect(model).not.toBe(anotherModel);
	});

	test('should create new model for the same room if old one has been unused', () => {
		createModel();

		const track = ctx.subscribeTrack(model.activititesAtom);

		track.unsubscribe();

		expect(model).not.toBe(create({ roomId: defaultRoomId, }));
	});

	test('should load all activitites', async () => {
		createModel();

		const track = ctx.subscribeTrack(model.activititesAtom);

		await take(ctx, model.activititesAtom);

		expect(track.lastInput()).toStrictEqual(activities);
		expect(ctx.get(model.hasItemsAtom)).toBeTruthy();
		expect(ctx.get(model.pagesCountAtom)).toBe(2);

		track.unsubscribe();
	});

	test('should fetch new data on fetch action call', async () => {
		createModel();

		const track = ctx.subscribeTrack(model.activititesAtom);

		await take(ctx, model.activititesAtom);

		await takeNested(ctx, model.fetch, { actionIds: [actions[1].id], });

		const newActivities = activities.filter(
			(activity) => activity.action.id === actions[1].id
		);

		expect(track.lastInput()).toStrictEqual(newActivities);
		expect(ctx.get(model.hasItemsAtom)).toBe(!!newActivities.length);
		expect(ctx.get(model.pagesCountAtom)).toBe(2);

		track.unsubscribe();
	});

	test('should refresh activities every 5 sec', async () => {
		createModel();

		const track = ctx.subscribeTrack(model.activititesAtom);

		await take(ctx, model.activititesAtom);

		const promise = take(ctx, model.activititesAtom);

		await vi.advanceTimersByTimeAsync(5000);

		await expect(promise).resolves.toStrictEqual(activities);

		track.unsubscribe();
	});
});
