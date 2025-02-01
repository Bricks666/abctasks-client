import { describe, expect, test } from 'vitest';
import zod from 'zod';

import { PaginationResponse, StandardResponse } from '../types';

import {
	createPaginationResponseSchema,
	createStandardResponseSchema
} from './create-response-schemas';

describe('shared/lib/create-response-schemas.ts', () => {
	const objectSchema = zod
		.object({
			name: zod.string(),
		})
		.readonly();

	describe('createPaginationResponseSchema', () => {
		const schema = createPaginationResponseSchema(objectSchema);

		test('should parse successfuly when response has right shape', async () => {
			const response: PaginationResponse<any> = {
				data: {
					limit: 100,
					totalCount: 101,
					items: [
						{
							name: 'name',
						},
						{
							name: 'another-name',
						}
					],
				},
				statusCode: 200,
			};

			await expect(schema.parseAsync(response)).resolves.toStrictEqual(
				response
			);
		});

		test('should parse unsuccessfuly when response has invalid shape', async () => {
			const response: PaginationResponse<any> = {
				data: {
					limit: '100',
					totalCount: '101',
					items: [
						{
							name: 'name',
						},
						{
							name: 'another-name',
						}
					],
				},
				statusCode: 200,
			};

			await expect(schema.parseAsync(response)).rejects.toThrow();
		});
	});

	describe('createStandardResponseSchema', () => {
		const schema = createStandardResponseSchema(objectSchema);

		test('should parse successfuly when response has right shape', async () => {
			const response: StandardResponse<any> = {
				data: {
					name: 'name',
				},
				statusCode: 200,
			};

			await expect(schema.parseAsync(response)).resolves.toStrictEqual(
				response
			);
		});

		test('should parse unsuccessfuly when response has invalid shape', async () => {
			const response: StandardResponse<any> = {
				data: {
					name1: 'name',
				},
				statusCode: 200,
			};

			await expect(schema.parseAsync(response)).rejects.toThrow();
		});
	});
});
