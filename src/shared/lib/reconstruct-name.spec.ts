import { describe, expect, test } from 'vitest';

import { constructName } from './construct-name';
import { reconstructName } from './reconstruct-name';

describe('reconstructName', () => {
	test('should replace parts from end of passed name with passed parts', () => {
		const oldName = constructName('grand', 'parent', 'child');

		const parts = ['parent2', 'child2'];

		const name = reconstructName(oldName, ...parts);

		expect(name).toBe('grand.parent2.child2');
	});

	test('should replace whole name with new parts if it longer than old one', () => {
		const oldName = constructName('grand');

		const parts = ['parent2', 'child2'];

		const name = reconstructName(oldName, ...parts);

		expect(name).toBe('parent2.child2');
	});
});
