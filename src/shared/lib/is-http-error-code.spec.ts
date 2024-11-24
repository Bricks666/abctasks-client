import { describe, expect, test } from 'vitest';

import { isHttpError, isHttpErrorCode } from './is-http-error-code';

describe('shared/lib/is-http-error-code', () => {
	describe('isHttpError', () => {
		test('should return true if passed http error', () => {
			const result = isHttpError({
				request: {},
			});

			expect(result).toBeTruthy();
		});

		test('should return false otherwise', () => {
			const result = isHttpError(new Error());

			expect(result).toBeFalsy();
		});
	});

	describe('isHttpErrorCode', () => {
		test('should return true if response has passed code', () => {
			const result = isHttpErrorCode(
				{
					request: {},
					response: { status: 404, },
				},
				404
			);

			expect(result).toBeTruthy();
		});

		test('should return false if response has another code', () => {
			const result = isHttpErrorCode(
				{
					request: {},
					response: { status: 404, },
				},
				400
			);

			expect(result).toBeFalsy();
		});

		test('should return false if error is not http error', () => {
			const result = isHttpErrorCode(
				{
					response: { status: 404, },
				},
				400
			);

			expect(result).toBeFalsy();
		});
	});
});
