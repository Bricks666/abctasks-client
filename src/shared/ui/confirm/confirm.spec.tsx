import { beforeEach, describe, expect, test, vi } from 'vitest';

import { Confirm } from './confirm';

import { RenderResult, render } from '~/test-utils';

describe('shared/ui/confirm/confirm', () => {
	let wrapper: RenderResult;
	const agreeText = 'Aggree Text';
	const disagreeText = 'Disaggree Text';
	const onAgree = vi.fn();
	const onDisagree = vi.fn();
	const onClose = vi.fn();
	const isOpen = true;
	const title = 'title';
	const content = 'some content';

	const createComponent = () => {
		wrapper = render(
			<Confirm
				agreeText={agreeText}
				disagreeText={disagreeText}
				onAgree={onAgree}
				onDisagree={onDisagree}
				title={title}
				content={content}
				isOpen={isOpen}
				onClose={onClose}
			/>
		);
	};

	const findConfirm = () => wrapper.getByRole('dialog', { name: title, });
	const findAgreeButton = () =>
		wrapper.getByRole('button', { name: agreeText, });
	const findDisagreeButton = () =>
		wrapper.getByRole('button', { name: disagreeText, });

	beforeEach(() => {
		createComponent();
	});

	test('should render confirm modal', () => {
		expect(findConfirm()).toMatchSnapshot();
	});

	test('should agree on agree button click', async () => {
		const button = findAgreeButton();

		await wrapper.user.click(button);

		expect(onAgree).toHaveBeenCalled();
	});

	test('should disagree on disagree button click', async () => {
		const button = findDisagreeButton();

		await wrapper.user.click(button);

		expect(onDisagree).toHaveBeenCalled();
	});
});
