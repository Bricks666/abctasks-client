import { beforeEach, describe, expect, test } from 'vitest';

import { createFlag } from './create-flag';

import { Scope, allSettled, fork } from '~/test-utils';

describe('shared/lib/create-flag', () => {
	let scope: Scope;
	const flagModel = createFlag();

	beforeEach(() => {
		scope = fork();
	});

	test('should set true to flag on enable action call', async () => {
		await allSettled(flagModel.$flag, { scope, params: false, });

		await allSettled(flagModel.enable, { scope, });

		expect(scope.getState(flagModel.$flag)).toBeTruthy();
	});

	test('should set false to flag on disable action call', async () => {
		await allSettled(flagModel.$flag, { scope, params: true, });

		await allSettled(flagModel.disable, { scope, });

		expect(scope.getState(flagModel.$flag)).toBeFalsy();
	});

	test.each([
		{ value: true, result: false, },
		{ value: false, result: true, }
	])(
		'should set $result to flag on toggle action call when value=$value',
		async ({ result, value, }) => {
			await allSettled(flagModel.$flag, { scope, params: value, });

			await allSettled(flagModel.toggle, { scope, });

			expect(scope.getState(flagModel.$flag)).toBe(result);
		}
	);

	test('should return valid unitshape object', () => {
		expect(flagModel['@@unitShape']()).toStrictEqual({
			flag: flagModel.$flag,
			enable: flagModel.enable,
			disable: flagModel.disable,
			toggle: flagModel.toggle,
		});
	});
});
