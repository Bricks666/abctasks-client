import { useColorScheme } from '@mui/material';
import { ColorSchemeContextValue } from '@mui/system';
import { beforeEach, describe, expect, test } from 'vitest';

import { started } from './app';
import {
	$biScheme,
	$scheme,
	colorSchemeChanged,
	useSyncScheme
} from './scheme';

import {
	RenderHookResult,
	Scope,
	act,
	allSettled,
	fork,
	renderHook,
	setMedia
} from '~/test-utils';

describe('shared/models/scheme', () => {
	const schemes = ['light', 'system', 'dark'] as const;
	let scope: Scope;

	beforeEach(async () => {
		setMedia({
			'prefers-color-scheme': 'light',
		});

		scope = fork();

		await allSettled(started, { scope, });
	});

	test('should has system value by default', async () => {
		expect(scope.getState($scheme)).toBe('system');
	});

	describe('change', () => {
		test.each(schemes)(
			'should change color scheme on colorSchemeChanged call with %s',
			async (scheme) => {
				await allSettled(colorSchemeChanged, { scope, params: scheme, });

				expect(scope.getState($scheme)).toBe(scheme);
			}
		);

		test('should keep old value if colorSchemeChanged was called with empty one', async () => {
			const currentScheme = scope.getState($scheme);

			await allSettled(colorSchemeChanged, { scope, params: null, });

			expect(scope.getState($scheme)).toBe(currentScheme);
		});
	});

	describe('bivalue scheme', () => {
		test('should convert light scheme to light in bivalue one', async () => {
			await allSettled(colorSchemeChanged, { scope, params: 'light', });

			expect(scope.getState($biScheme)).toBe('light');
		});

		test('should convert light scheme to dark in bivalue one', async () => {
			await allSettled(colorSchemeChanged, { scope, params: 'dark', });

			expect(scope.getState($biScheme)).toBe('dark');
		});

		test.skip.each(['dark', 'light'])(
			'should convert auto scheme to %s in bivalue one if prefers-ciolor-scheme=%s',
			async (scheme) => {
				setMedia({
					'prefers-color-scheme': scheme,
				});

				await allSettled(colorSchemeChanged, { scope, params: 'system', });

				expect(scope.getState($biScheme)).toBe(scheme);
			}
		);
	});

	describe('persist', () => {
		const key = 'abc-color-scheme';

		test.each(schemes)(
			'should save current scheme into local storage',
			async (scheme) => {
				// To initiate reading from local storage
				window.dispatchEvent(new StorageEvent('storage', { key, }));

				await allSettled(colorSchemeChanged, { scope, params: scheme, });

				expect(localStorage.getItem(key)).toBe(JSON.stringify(scheme));
			}
		);

		test.each(schemes)(
			'should load saved %s scheme from local storage',
			(scheme) => {
				localStorage.setItem(key, JSON.stringify(scheme));

				window.dispatchEvent(new StorageEvent('storage', { key, }));

				expect(scope.getState($scheme)).toBe(scheme);
			}
		);
	});

	describe('useSyncScheme', () => {
		let wrapper: RenderHookResult<ColorSchemeContextValue<string>, void>;

		const createComponent = () => {
			wrapper = renderHook(
				() => {
					useSyncScheme();
					return useColorScheme();
				},
				{ scope, }
			);
		};

		beforeEach(async () => {
			await act(() => createComponent());
		});

		test('should sync biScheme with mui scheme', async () => {
			expect(wrapper.result.current.mode).toBe(scope.getState($biScheme));

			await allSettled(colorSchemeChanged, { scope, params: 'dark', });

			expect(wrapper.result.current.mode).toBe(scope.getState($biScheme));
		});
	});
});
