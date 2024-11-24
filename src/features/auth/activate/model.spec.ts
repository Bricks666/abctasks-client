import { beforeEach, describe, expect, test } from 'vitest';

import { query } from './model';

import { server, handlers, Scope, allSettled, fork } from '~/test-utils';

describe('features/auth/activate/model', () => {
	const token = 'some-token';
	let scope: Scope;

	beforeEach(() => {
		scope = fork();
	});

	test('should send activate query', async () => {
		await allSettled(query.start, { scope, params: { token, }, });

		expect(scope.getState(query.$data)).toBe(true);
		expect(scope.getState(query.$error)).toBeNull();
	});

	test('should fail on return any data except boolean', async () => {
		server.use(handlers.auth.error.activate);

		await allSettled(query.start, { scope, params: { token, }, });

		expect(scope.getState(query.$data)).toBeNull();
		expect(scope.getState(query.$error)).not.toBeNull();
	});
});
