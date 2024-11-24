import { describe, expect, test } from 'vitest';

import { StandardResponse } from '../types';

import { extractData } from './extract-data';

describe('shared/lib/extract-data', () => {
	const result = {
		statusCode: 200,
		data: 'string',
	} as StandardResponse<string>;

	test('should return data from response', () => {
		const data = extractData({ result, });

		expect(data).toBe(result.data);
	});
});
