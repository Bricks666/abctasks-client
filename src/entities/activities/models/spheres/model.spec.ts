import { getDefaultInjector } from 'bunshi';
import { beforeEach, describe, expect, test } from 'vitest';

import { TestCtx, spheres, createTestCtx, waitNextTick } from '~/test-utils';

import { Molecule } from './model';
import { ActivitySpheresModel } from './types';

describe('entities/activitites/models/spheres/model.ts', () => {
	let ctx: TestCtx;
	let model: ActivitySpheresModel;

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

	test('should load all spheres', async () => {
		createModel();

		const track = ctx.subscribeTrack(model.spheresAtom);

		await waitNextTick();

		expect(track.lastInput()).toStrictEqual(spheres);

		track.unsubscribe();
	});
});
