import { EventHandler, SyntheticEvent } from 'react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { VoidFunction } from '../types';

import { usePreventDefault } from './use-prevent-default';

import { RenderHookResult, act, renderHook } from '~/test-utils';

describe('shared/lib/use-prevent-default', () => {
	const handler = vi.fn();
	const event = { preventDefault: vi.fn(), } as any as SyntheticEvent;
	let wrapper: RenderHookResult<EventHandler<any>, VoidFunction>;

	const createComponent = () => {
		wrapper = renderHook(usePreventDefault, { initialProps: handler, });
	};

	beforeEach(async () => {
		await act(() => createComponent());
	});

	test('should prevent default behavior of event and call handler', () => {
		wrapper.result.current(event);

		expect(event.preventDefault).toHaveBeenCalled();
		expect(handler).toHaveBeenCalled();
	});
});
