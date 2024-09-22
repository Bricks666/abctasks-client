import { describe, expect, test, vi } from 'vitest';

import { TextWithAction, TextWithActionProps } from './text-with-action';

import { render, RenderResult } from '~/test-utils';

describe('shaerd/ui/text-with-action/text-with-action', () => {
	let wrapper: RenderResult;

	const defaultProps: TextWithActionProps = {
		actionText: 'action text',
		onClick: vi.fn(),
		text: 'text',
		className: 'classname',
	};

	const createComponent = (props: TextWithActionProps = defaultProps) => {
		wrapper = render(<TextWithAction {...props} />);
	};
	const findRoot = (): HTMLDivElement => wrapper.container.children[0]!;
	const findButton = () =>
		wrapper.getByRole('button', { name: defaultProps.actionText, });

	test('should render paragraph with button', () => {
		createComponent();

		expect(findRoot()).toMatchSnapshot('simple variant');
	});

	test('should render button with icon if it passed', () => {
		createComponent({ ...defaultProps, icon: <div>icon</div>, });

		expect(findRoot()).toMatchSnapshot('with icon');
	});

	test('should handle click on button with passed handler', async () => {
		createComponent();

		const button = findButton();

		await wrapper.user.click(button);

		expect(defaultProps.onClick).toHaveBeenCalled();
	});
});
