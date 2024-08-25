/* eslint-disable sonarjs/no-duplicate-string */
import { createEffect } from 'effector';
import { beforeEach, describe, expect, test } from 'vitest';

// eslint-disable-next-line no-restricted-imports
import { started } from '../app';

import {
	$device,
	$isDesktopLarge,
	$isDesktopSmall,
	$isMobile,
	$isTabletHorizontal,
	$isTabletVertical
} from './model';

import { Scope, allSettled, fork } from '~/test-utils';

describe('shared/models/device-info/model', () => {
	let scope: Scope;

	beforeEach(async () => {
		scope = fork();

		window.innerWidth = 1920;

		await allSettled(started, { scope, });
	});

	test('should calculate initialal size on app start', () => {
		expect(scope.getState($device)).toBe('desktop-large');
		expect(scope.getState($isMobile)).toBeFalsy();
		expect(scope.getState($isTabletVertical)).toBeFalsy();
		expect(scope.getState($isTabletHorizontal)).toBeFalsy();
		expect(scope.getState($isDesktopSmall)).toBeFalsy();
		expect(scope.getState($isDesktopLarge)).toBeTruthy();
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

			await allSettled(
				createEffect(() => {
					window.dispatchEvent(new Event('resize'));
				}),
				{ scope, }
			);

			expect(scope.getState($device)).toBe(type);
			expect(scope.getState($isMobile)).toBe(type === 'mobile');
			expect(scope.getState($isTabletVertical)).toBe(
				type === 'tablet-vertical'
			);
			expect(scope.getState($isTabletHorizontal)).toBe(
				type === 'tablet-horizontal'
			);
			expect(scope.getState($isDesktopSmall)).toBe(type === 'desktop-small');
			expect(scope.getState($isDesktopLarge)).toBe(type === 'desktop-large');
		}
	);
});
