import { beforeEach, describe, expect, test } from 'vitest';

import { TestCtx, actions, createTestCtx, waitNextTick } from '~/test-utils';

import { create } from './model';
import { ActivityActionsModel } from './types';

describe('src/entities/activitites/models/actions/model.ts', () => {
	let ctx: TestCtx;
	let model: ActivityActionsModel;

	const createModel = () => {
		model = create();
	};

	beforeEach(() => {
		ctx = createTestCtx();
	});

	test('should create signleton model', () => {
		createModel();

		const anotherModel = create();

		expect(model).toBe(anotherModel);
	});

	test('should stale model only after last susbcriber unsubscribe', () => {
		createModel();
		const anotherModel = create();

		const track = ctx.subscribeTrack(model.actionsAtom);
		const anotherTrack = ctx.subscribeTrack(anotherModel.actionsAtom);

		expect(model).toBe(anotherModel);

		anotherTrack.unsubscribe();

		expect(model).toBe(create());

		track.unsubscribe();

		expect(model).not.toBe(create());
	});

	test('should load all actions', async () => {
		createModel();

		const track = ctx.subscribeTrack(model.actionsAtom);

		await waitNextTick();

		expect(track.lastInput()).toStrictEqual(actions);

		track.unsubscribe();
	});
});
