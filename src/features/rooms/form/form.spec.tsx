import { render, RenderResult } from '@testing-library/react';
import { fork, Scope } from 'effector';
import { Provider } from 'effector-react';
import { beforeEach, describe, expect, test, vi } from 'vitest';

import { RoomForm, RoomFormProps } from './form';
import { create } from './model';


import { user } from '~/tests';

describe('features/rooms/form/form', () => {
	const $form = create();
	const buttonText = 'button text';
	const title = 'title';
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = (props?: Partial<RoomFormProps>) => {
		wrapper = render(
			<Provider value={scope}>
				<RoomForm
					$form={$form}
					buttonText={buttonText}
					title={title}
					{...props}
				/>
			</Provider>
		);
	};
	const findForm = () => wrapper.getByRole('form', { name: 'title', });
	const findNameField = () =>
		wrapper.getByRole('textbox', { name: 'actions.room_form.fields.name', });
	const findDescriptionField = () =>
		wrapper.getByRole('textbox', {
			name: 'actions.room_form.fields.description',
		});
	const findButton = () => wrapper.getByRole('button', { name: buttonText, });

	beforeEach(() => {
		scope = fork();
	});

	test('should render form with 3 fields and button when hideButton = false', () => {
		createComponent({ hideButton: false, });

		expect(findForm()).toMatchSnapshot('without button');
	});

	test('should render form with 3 fields when hideButton = true', () => {
		createComponent({ hideButton: true, });

		expect(findForm()).toMatchSnapshot('with disabled button');
	});

	test('should disable button when disabled = true', () => {
		createComponent({ hideButton: false, disabled: true, });

		expect(findForm()).toMatchSnapshot('with button');
	});

	test('should submit form on button click', async () => {
		const fn = vi.fn();
		const { unsubscribe, } = $form.formValidated.subscribe(fn);

		createComponent();

		const name = findNameField();
		await user.click(name);
		await user.keyboard('some name');

		const description = findDescriptionField();

		await user.click(description);
		await user.keyboard('some description');

		const button = findButton();

		await user.click(button);

		expect(fn).toHaveBeenCalled();
		expect(fn).toHaveBeenCalledWith({
			name: 'some name',
			description: 'some description',
		});

		unsubscribe();
	});

	describe('validation', () => {
		beforeEach(() => {
			createComponent();
		});

		describe('name field', () => {
			test('empty field', async () => {
				const button = findButton();

				await user.click(button);

				expect(
					wrapper.getByText('actions.room_form.errors.name.empty')
				).toBeInTheDocument();
			});

			test('too short name', async () => {
				const name = findNameField();
				await user.click(name);
				await user.keyboard('name');

				const button = findButton();

				await user.click(button);

				expect(
					wrapper.getByText('actions.room_form.errors.name.min_length')
				).toBeInTheDocument();
			});

			test('too long name', async () => {
				const name = findNameField();
				await user.click(name);
				await user.keyboard(
					'skljsngjsndgkjsdfkjgnskdfnkj;sdfngkjsdngkjnjnsnsj;fnjksnfgjksndfgjnsdfjkgnsdkjlfng'
				);

				const button = findButton();

				await user.click(button);

				expect(
					wrapper.getByText('actions.room_form.errors.name.max_length')
				).toBeInTheDocument();
			});
		});

		describe('description field', () => {
			test('too long description', async () => {
				const name = findNameField();
				await user.click(name);
				await user.keyboard('some name');

				const description = findDescriptionField();
				await user.click(description);
				/**
				 * @todo
				 * Optimize way of input
				 */
				await user.keyboard(
					`skljsngjsndgkjsdfkjgnskd adfg sdf gsd
          fg sdfg sdfg sdf gsd fg sdfg sdf gsd fg sdfg sdfmgg sdjfkfg skdfn n
          nsf nsdngjsdgjsfig sdfgjisdgijsndlijg nsfljfg jlsdf giljsdbglibslgbsljbg
          shjdfghjsdfbfghjsbdfdgghbsdflhblsdgsdfbglhbsfbsdfglsdfb
          sdlfhgbsdlhfbglhsdfbgjhsdfjhbsdfjhbsdfhgbsdlfhb`
				);

				const button = findButton();

				await user.click(button);

				expect(
					wrapper.getByText('actions.room_form.errors.description.max_length')
				).toBeInTheDocument();
			});
		});
	});
});
