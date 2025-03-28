import { take } from '@reatom/framework';
import { getDefaultInjector } from 'bunshi';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import {
	TestCtx,
	createTestCtx,
	handlers,
	tasks,
	defaultTask,
	server,
	waitNextTick,
	defaultRoom
} from '~/test-utils';

// eslint-disable-next-line no-restricted-imports
import { roomModel } from '@/entities/rooms/@x/tasks';

import { Molecule, Scope } from './model';
import type { TaskModel } from './types';

describe('entities/tasks/models/task/model.ts', () => {
	let ctx: TestCtx;
	let model: TaskModel;

	const createModel = (taskId = defaultTask.id) => {
		model = getDefaultInjector().get(
			Molecule,
			[Scope, taskId],
			[roomModel.Scope, defaultRoom.id]
		);
	};

	beforeEach(() => {
		ctx = createTestCtx();
	});

	test('should load task by taskId', async () => {
		createModel();

		const track = ctx.subscribeTrack(model.taskAtom);

		expect(ctx.get(model.pendingAtom)).toBeTruthy();

		await waitNextTick();

		expect(track.lastInput()).toStrictEqual(defaultTask);
		expect(ctx.get(model.errorAtom)).toBeNull();
		expect(ctx.get(model.pendingAtom)).toBeFalsy();

		track.unsubscribe();
	});

	test('should save error if task has not been found', async () => {
		createModel();

		server.use(handlers.tasks.error.getOne.notFound);

		const track = ctx.subscribeTrack(model.taskAtom);

		await waitNextTick();

		expect(track.lastInput()).toBeNull();
		expect(ctx.get(model.errorAtom)).not.toBeNull();
		expect(ctx.get(model.pendingAtom)).toBeFalsy();

		track.unsubscribe();
	});

	test('should save error if something went wrong', async () => {
		createModel();

		server.use(handlers.tasks.error.getOne.internalError);

		const track = ctx.subscribeTrack(model.taskAtom);

		await waitNextTick();

		expect(track.lastInput()).toBeNull();
		await expect(take(ctx, model.errorAtom)).resolves.not.toBeNull();
		expect(ctx.get(model.pendingAtom)).toBeFalsy();

		track.unsubscribe();
	});

	test('should save error if returned invalid data', async () => {
		createModel();

		server.use(handlers.tasks.error.getOne.invalidData);

		const track = ctx.subscribeTrack(model.taskAtom);

		await waitNextTick();

		expect(track.lastInput()).toBeNull();
		expect(ctx.get(model.errorAtom)).not.toBeNull();
		expect(ctx.get(model.pendingAtom)).toBeFalsy();

		track.unsubscribe();
	});

	test('should refetch query every 5 seconds', async () => {
		vi.useFakeTimers();

		createModel();

		server.use(handlers.tasks.error.getOne.invalidData);

		const track = ctx.subscribeTrack(model.taskAtom);

		await vi.advanceTimersByTimeAsync(5000);

		expect(track.lastInput()).toBeNull();
		expect(ctx.get(model.errorAtom)).not.toBeNull();
		expect(ctx.get(model.pendingAtom)).toBeFalsy();

		track.unsubscribe();

		await vi.runOnlyPendingTimersAsync();
		vi.useRealTimers();
	});

	test('should creaet different instance for different task ids', async () => {
		createModel();

		const oldModel = model;

		createModel(tasks[1].id);

		expect(model).not.toBe(oldModel);
	});
});
