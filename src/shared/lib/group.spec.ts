import { describe, expect, test } from 'vitest';

import { group } from './group';

describe('shared/lib/group', () => {
	const items = [
		{
			type: 'simple',
		},
		{
			type: 'complex',
		},
		{
			type: 'simple',
		}
	];

	test('should group items via passed key value', () => {
		const grouped = group(items, 'type');

		expect(grouped).toStrictEqual({
			simple: [items[0], items[2]],
			complex: [items[1]],
		});
	});
});
