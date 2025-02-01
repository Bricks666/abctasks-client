import { beforeEach, describe, expect, test } from 'vitest';

import { TestCtx, spheres, createTestCtx, waitNextTick } from '~/test-utils';

import { create } from './model';
import { ActivitySpheresModel } from './types';

describe('src/entities/activitites/models/spheres/model.ts', () => {
	let ctx: TestCtx;
	let model: ActivitySpheresModel;

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

		const track = ctx.subscribeTrack(model.spheresAtom);
		const anotherTrack = ctx.subscribeTrack(anotherModel.spheresAtom);

		expect(model).toBe(anotherModel);

		anotherTrack.unsubscribe();

		expect(model).toBe(create());

		track.unsubscribe();

		expect(model).not.toBe(create());
	});

	test('should load all spheres', async () => {
		createModel();

		const track = ctx.subscribeTrack(model.spheresAtom);

		await waitNextTick();

		expect(track.lastInput()).toStrictEqual(spheres);

		track.unsubscribe();
	});
});
