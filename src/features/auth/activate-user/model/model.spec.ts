import { urlAtom } from '@reatom/url';
import { getDefaultInjector } from 'bunshi';
import { beforeEach, describe, expect, test } from 'vitest';

import {
	server,
	handlers,
	createTestCtx,
	waitNextTick,
	type TestCtx
} from '~/test-utils';

import { Molecule } from './model';
import type { ActivateUserModel } from './types';

describe('features/auth/activate-user/model/model.ts', () => {
	const token = 'some-token';

	let ctx: TestCtx;
	let model: ActivateUserModel;

	const createModel = () => {
		model = getDefaultInjector().get(Molecule);
	};

	beforeEach(() => {
		ctx = createTestCtx();

		urlAtom.go(ctx, `/activate?token=${token}`, true);
	});

	test('should try to activate user', async () => {
		createModel();

		const track = ctx.subscribeTrack(model.activatedAtom);

		expect(ctx.get(model.pendingAtom)).toBeTruthy();

		await waitNextTick();

		expect(track.lastInput()).toBe(true);
		expect(ctx.get(model.errorAtom)).toBeNull();
		expect(ctx.get(model.pendingAtom)).toBeFalsy();

		track.unsubscribe();
	});

	test('should fail if user is already activated', async () => {
		createModel();

		server.use(handlers.auth.error.activate.alreadyActivated);

		const track = ctx.subscribeTrack(model.activatedAtom);

		await waitNextTick();

		expect(track.lastInput()).toBe(false);
		expect(ctx.get(model.errorAtom)).toBe('already_activated');

		// @todo Check notifications/snacks

		track.unsubscribe();
	});

	test('should fail on return any data except boolean', async () => {
		createModel();

		server.use(handlers.auth.error.activate.invalidData);

		const track = ctx.subscribeTrack(model.activatedAtom);

		await waitNextTick();

		expect(track.lastInput()).toBe(false);
		expect(ctx.get(model.errorAtom)).toBe('unknown');

		track.unsubscribe();
	});
});
