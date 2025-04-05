import { getDefaultInjector } from 'bunshi';
import { beforeEach, describe, expect, test } from 'vitest';

import { TestCtx, actions, createTestCtx, waitNextTick } from '~/test-utils';

import { Molecule } from './model';
import { ActivityActionsModel } from './types';

describe('entities/activitites/models/actions/model.ts', () => {
	let ctx: TestCtx;
	let model: ActivityActionsModel;

	const createModel = () => {
		model = getDefaultInjector().get(Molecule);
	};

	beforeEach(() => {
		ctx = createTestCtx();
	});

	test('should create signleton model', () => {
		createModel();

		const oldModel = model;

		createModel();

		expect(model).toBe(oldModel);
	});

	test('should load all actions', async () => {
		createModel();

		const track = ctx.subscribeTrack(model.actionsAtom);

		await waitNextTick();

		expect(track.lastInput()).toStrictEqual(actions);

		track.unsubscribe();
	});
});
