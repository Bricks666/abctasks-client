import { beforeEach, describe, expect, test } from 'vitest';

import { usePageTitle } from './use-page-title';

import { RenderHookResult, act, renderHook } from '~/test-utils';

describe('shared/lib/use-page-title', () => {
	const defaultTitle = 'default title';
	const newTitle = 'new title';
	let wrapper: RenderHookResult<void, string>;

	const createComponent = () => {
		wrapper = renderHook(usePageTitle, { initialProps: newTitle, });
	};

	beforeEach(async () => {
		document.title = defaultTitle;

		await act(() => createComponent());
	});

	test('should setup passed title', () => {
		expect(document.title).toBe(newTitle);
	});

	test('should return old title on unmount', async () => {
		await act(() => wrapper.unmount());

		expect(document.title).toBe(defaultTitle);
	});
});
