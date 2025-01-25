import { beforeEach, describe, expect, test } from 'vitest';

import {
	isDesktopLargeAtom,
	isMobileAtom,
	isTabletVerticalAtom
} from './model';
import { useIsSmallScreen } from './use-is-small-screen';

import {
	RenderHookResult,
	TestCtx,
	createTestCtx,
	renderHook
} from '~/test-utils';

describe('shared/models/device-info/use-is-small-screen.ts', () => {
	let ctx: TestCtx;
	let wrapper: RenderHookResult<boolean, never>;

	const createHook = () => {
		wrapper = renderHook(useIsSmallScreen, { ctx, });
	};

	beforeEach(() => {
		ctx = createTestCtx();
	});

	test('should return true is device is a mobile', () => {
		ctx.mock(isMobileAtom, true);

		createHook();

		expect(wrapper.result.current).toBeTruthy();
	});

	test('should return true is device is a tablet in vertical mode', () => {
		ctx.mock(isTabletVerticalAtom, true);

		createHook();

		expect(wrapper.result.current).toBeTruthy();
	});

	test('should return false if device is not neither a mobile or a tablet', () => {
		ctx.mock(isDesktopLargeAtom, true);

		createHook();

		expect(wrapper.result.current).toBeFalsy();
	});
});
