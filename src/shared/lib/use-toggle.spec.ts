import { beforeEach, describe, expect, test } from 'vitest';

import { UseToggleResult, useToggle } from './use-toggle';

import { RenderHookResult, act, renderHook } from '~/test-utils';

describe('shared/liv/use-toggle', () => {
	let wrapper: RenderHookResult<UseToggleResult, boolean>;

	const createComponent = (defaultValue?: boolean) => {
		wrapper = renderHook(useToggle, {
			initialProps: defaultValue,
		});
	};

	beforeEach(() => {
		createComponent();
	});

	test('should return current toggle state and handlers', () => {
		expect(wrapper.result.current).toStrictEqual([
			false,
			{
				toggle: expect.any(Function),
				toggleOff: expect.any(Function),
				toggleOn: expect.any(Function),
			}
		]);
	});

	test('should toggle to opossite value', async () => {
		const [value, handlers] = wrapper.result.current;

		await act(() => handlers.toggle());

		expect(wrapper.result.current[0]).toBe(!value);

		await act(() => handlers.toggle());

		expect(wrapper.result.current[0]).toBe(value);
	});

	test('should force toggle off', async () => {
		const [, handlers] = wrapper.result.current;

		await act(() => handlers.toggleOff());

		expect(wrapper.result.current[0]).toBe(false);

		await act(() => handlers.toggleOff());

		expect(wrapper.result.current[0]).toBe(false);
	});

	test('should force toggle on', async () => {
		const [, handlers] = wrapper.result.current;

		await act(() => handlers.toggleOn());

		expect(wrapper.result.current[0]).toBe(true);

		await act(() => handlers.toggleOn());

		expect(wrapper.result.current[0]).toBe(true);
	});
});
