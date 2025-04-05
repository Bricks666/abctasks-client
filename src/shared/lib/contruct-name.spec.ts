import { describe, expect, test } from 'vitest';

import { constructName } from './construct-name';

describe('src/shared/lib/contruct-name', () => {
	test('should create model name', () => {
		const name = constructName('grand', 'parent', 'child');

		expect(name).toBe('grand.parent.child');
	});
});
