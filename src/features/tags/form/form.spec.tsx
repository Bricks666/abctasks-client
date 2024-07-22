import {
	fireEvent,
	render,
	RenderResult,
	waitFor
} from '@testing-library/react';
import { Scope } from 'effector';
import { Provider } from 'effector-react';
import { describe, expect, test, vi } from 'vitest';

import { TagForm } from './form';
import { create } from './model';

describe('features/tags/form/form', () => {
	const form = create();
	const buttonText = 'submit';
	const titleText = 'form title';

	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = () => {
		wrapper = render(
			<Provider value={scope}>
				<TagForm $form={form} buttonText={buttonText} titleText={titleText} />
			</Provider>
		);
	};
	const findForm = () => wrapper.getByRole('form', { name: titleText, });
	const findNameField = () =>
		wrapper.getByRole('textbox', { name: 'actions.tag_form.fields.name', });
	const findButton = () => wrapper.getByRole('button', { name: buttonText, });

	test('should render form with preview, 3 fields and button', async () => {
		createComponent();

		expect(findForm()).toMatchSnapshot('with button');
	});

	test('should hide button if passed hideButton=true', async () => {
		createComponent();

		wrapper.rerender(
			<Provider value={scope}>
				<TagForm
					$form={form}
					buttonText={buttonText}
					titleText={titleText}
					hideButton
				/>
			</Provider>
		);

		expect(findForm()).toMatchSnapshot('without button');
	});

	test('should submit form on button click', async () => {
		expect.assertions(1);

		const cb = vi.fn();
		const unwatch = form.formValidated.watch(cb);

		createComponent();

		const button = findButton();

		fireEvent.click(button);

		expect(cb).toHaveBeenCalled();

		unwatch();
	});

	describe('validation', () => {
		describe('name', () => {
			test('empty', async () => {
				createComponent();

				const nameField = findNameField();

				fireEvent.input(nameField, { target: { value: '', }, });

				const button = findButton();

				fireEvent.click(button);

				await waitFor(() => {
					expect(wrapper.getByText("Name can't be empty"));
				});
			});
		});
	});
});
