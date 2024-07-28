import { allSettled } from 'effector';
import { describe, expect, test } from 'vitest';

import { createFlag } from './create-flag';

import { useTestScope } from '~/tests';

describe('shared/lib/create-flag', () => {
	const { getScope, } = useTestScope();
	const flagModel = createFlag();

	test('should set true to flag on enable action call', async () => {
		await allSettled(flagModel.$flag, { scope: getScope(), params: false, });

		await allSettled(flagModel.enable, { scope: getScope(), });

		expect(getScope().getState(flagModel.$flag)).toBeTruthy();
	});

	test('should set false to flag on disable action call', async () => {
		await allSettled(flagModel.$flag, { scope: getScope(), params: true, });

		await allSettled(flagModel.disable, { scope: getScope(), });

		expect(getScope().getState(flagModel.$flag)).toBeFalsy();
	});

	test.each([
		{ value: true, result: false, },
		{ value: false, result: true, }
	])(
		'should set $result to flag on toggle action call when value=$value',
		async ({ result, value, }) => {
			await allSettled(flagModel.$flag, { scope: getScope(), params: value, });

			await allSettled(flagModel.toggle, { scope: getScope(), });

			expect(getScope().getState(flagModel.$flag)).toBe(result);
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
