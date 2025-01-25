/* eslint-disable sonarjs/no-duplicate-string */
import { beforeEach, describe, expect, test } from 'vitest';

import {
	deviceAtom,
	isDesktopLargeAtom,
	isDesktopSmallAtom,
	isMobileAtom,
	isTabletHorizontalAtom,
	isTabletVerticalAtom
} from './model';

import { TestCtx, createTestCtx } from '~/test-utils';

describe('shared/models/device-info/model', () => {
	let ctx: TestCtx;

	beforeEach(async () => {
		ctx = createTestCtx();

		window.innerWidth = 1920;
	});

	test('should calculate initialal size on app start', () => {
		const track = ctx.subscribeTrack(deviceAtom);

		expect(track.lastInput()).toBe('desktop-large');
		expect(ctx.get(isMobileAtom)).toBeFalsy();
		expect(ctx.get(isTabletVerticalAtom)).toBeFalsy();
		expect(ctx.get(isTabletHorizontalAtom)).toBeFalsy();
		expect(ctx.get(isDesktopSmallAtom)).toBeFalsy();
		expect(ctx.get(isDesktopLargeAtom)).toBeTruthy();

		track.unsubscribe();
	});

	test.each([
		{ type: 'mobile', size: 320, },
		{ type: 'mobile', size: 540, },
		{ type: 'mobile', size: 1, },
		{ type: 'tablet-vertical', size: 640, },
		{ type: 'tablet-vertical', size: 720, },
		{ type: 'tablet-vertical', size: 541, },
		{ type: 'tablet-horizontal', size: 1024, },
		{ type: 'tablet-horizontal', size: 1200, },
		{ type: 'tablet-horizontal', size: 721, },
		{ type: 'desktop-small', size: 1320, },
		{ type: 'desktop-small', size: 1440, },
		{ type: 'desktop-small', size: 1201, },
		{ type: 'desktop-large', size: 1920, },
		{ type: 'desktop-large', size: 1441, },
		{ type: 'desktop-large', size: 4096, }
	])(
		'should recalculate size on window change. Size: $size, type: $type',
		async ({ size, type, }) => {
			window.innerWidth = size;

			window.dispatchEvent(new Event('resize'));

			expect(ctx.get(deviceAtom)).toBe(type);
			expect(ctx.get(isMobileAtom)).toBe(type === 'mobile');
			expect(ctx.get(isTabletVerticalAtom)).toBe(type === 'tablet-vertical');
			expect(ctx.get(isTabletHorizontalAtom)).toBe(
				type === 'tablet-horizontal'
			);
			expect(ctx.get(isDesktopSmallAtom)).toBe(type === 'desktop-small');
			expect(ctx.get(isDesktopLargeAtom)).toBe(type === 'desktop-large');
		}
	);
});
