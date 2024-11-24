import { beforeEach, describe, expect, test } from 'vitest';

import { EditMenu } from './edit-menu';

import { RenderResult, render } from '~/test-utils';

describe('shared/ui/menu-item/menu-item', () => {
	const label = 'button';
	let wrapper: RenderResult;

	const createComponent = () => {
		wrapper = render(<EditMenu label={label} />);
	};

	const findButton = () => wrapper.getByRole('button', { name: label, });
	const findMenu = () => wrapper.getByRole('menu');
	const openMenu = () => wrapper.user.click(findButton());

	beforeEach(() => {
		createComponent();
	});

	test('should render button witgh edit icon', () => {
		expect(findButton()).toMatchSnapshot();
		expect(findMenu).toThrow();
	});

	test('should render menu on button click', async () => {
		await openMenu();

		expect(findMenu()).toMatchSnapshot();
		expect(findButton).toThrow();
	});

	test.each(['small', 'medium', 'large'] as const)(
		'should configure button size with size prop. Size %s',
		async (size) => {
			wrapper.rerender(<EditMenu label={label} size={size} />);

			expect(findButton()).toHaveClass(
				`MuiIconButton-size${size[0].toUpperCase() + size.slice(1)}`
			);
		}
	);
});
