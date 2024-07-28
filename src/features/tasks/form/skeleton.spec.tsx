import { describe, expect, test } from 'vitest';

import { SkeletonTaskForm } from './skeleton';

import { useCreateComponent } from '~/tests';

describe('features/tags/form/skeleton', () => {
	const { getWrapper, create, } = useCreateComponent({
		Component: SkeletonTaskForm,
	});

	const findSkeletonRoot = (): HTMLElement =>
		getWrapper().container.querySelector('div')!;

	test('should render skeleton fields and skeleton button', () => {
		create();

		expect(findSkeletonRoot()).toMatchSnapshot();
	});
});
