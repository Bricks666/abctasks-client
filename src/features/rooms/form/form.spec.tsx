import { beforeEach, describe, expect, test, vi } from 'vitest';

import { RoomForm, RoomFormProps } from './form';
import { create } from './model';

import { RenderResult, Scope, act, fork, render } from '~/test-utils';

describe('features/rooms/form/form', () => {
	const $form = create();
	const buttonText = 'button text';
	const title = 'title';
	let wrapper: RenderResult;
	let scope: Scope;

	const createComponent = (props?: Partial<RoomFormProps>) => {
		wrapper = render(
			<RoomForm
				$form={$form}
				buttonText={buttonText}
				title={title}
				{...props}
			/>,
			{ scope, }
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

	beforeEach(async () => {
		scope = fork();

		await act(async () => createComponent({ hideButton: false, }));
	});

	test('should render form with 3 fields and button when hideButton = false', () => {
		expect(findForm()).toMatchSnapshot('without button');
	});

	test('should render form with 3 fields when hideButton = true', async () => {
		await act(async () =>
			wrapper.rerender(
				<RoomForm
					$form={$form}
					buttonText={buttonText}
					title={title}
					hideButton
				/>
			)
		);

		expect(findForm()).toMatchSnapshot('with disabled button');
	});

	test('should disable button when disabled = true', async () => {
		await act(async () =>
			wrapper.rerender(
				<RoomForm
					$form={$form}
					buttonText={buttonText}
					title={title}
					hideButton={false}
					disabled
				/>
			)
		);

		expect(findForm()).toMatchSnapshot('with button');
	});

	test('should submit form on button click', async () => {
		const fn = vi.fn();
		const { unsubscribe, } = $form.formValidated.subscribe(fn);

		const name = findNameField();
		await wrapper.user.click(name);
		await wrapper.user.keyboard('some name');

		const description = findDescriptionField();

		await wrapper.user.click(description);
		await wrapper.user.keyboard('some description');

		const button = findButton();

		await wrapper.user.click(button);

		expect(fn).toHaveBeenCalled();
		expect(fn).toHaveBeenCalledWith({
			name: 'some name',
			description: 'some description',
		});

		unsubscribe();
	});

	describe('validation', () => {
		describe('name field', () => {
			test('empty field', async () => {
				const button = findButton();

				await wrapper.user.click(button);

				expect(
					wrapper.getByText('actions.room_form.errors.name.empty')
				).toBeInTheDocument();
			});

			test('too short name', async () => {
				const name = findNameField();
				await wrapper.user.click(name);
				await wrapper.user.keyboard('name');

				const button = findButton();

				await wrapper.user.click(button);

				expect(
					wrapper.getByText('actions.room_form.errors.name.min_length')
				).toBeInTheDocument();
			});

			test('too long name', async () => {
				const name = findNameField();
				await wrapper.user.click(name);
				await wrapper.user.keyboard(
					'skljsngjsndgkjsdfkjgnskdfnkj;sdfngkjsdngkjnjnsnsj;fnjksnfgjksndfgjnsdfjkgnsdkjlfng'
				);

				const button = findButton();

				await wrapper.user.click(button);

				expect(
					wrapper.getByText('actions.room_form.errors.name.max_length')
				).toBeInTheDocument();
			});
		});

		describe('description field', () => {
			test('too long description', async () => {
				const name = findNameField();
				await wrapper.user.click(name);
				await wrapper.user.keyboard('some name');

				const description = findDescriptionField();
				await wrapper.user.click(description);
				/**
				 * @todo
				 * Optimize way of input
				 */
				await wrapper.user.keyboard(
					`skljsngjsndgkjsdfkjgnskd adfg sdf gsd
          fg sdfg sdfg sdf gsd fg sdfg sdf gsd fg sdfg sdfmgg sdjfkfg skdfn n
          nsf nsdngjsdgjsfig sdfgjisdgijsndlijg nsfljfg jlsdf giljsdbglibslgbsljbg
          shjdfghjsdfbfghjsbdfdgghbsdflhblsdgsdfbglhbsfbsdfglsdfb
          sdlfhgbsdlhfbglhsdfbgjhsdfjhbsdfjhbsdfhgbsdlfhb`
				);

				const button = findButton();

				await wrapper.user.click(button);

				expect(
					wrapper.getByText('actions.room_form.errors.description.max_length')
				).toBeInTheDocument();
			});
		});
	});
});
