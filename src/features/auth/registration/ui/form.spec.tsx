/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable sonarjs/no-duplicate-string */
import { beforeEach, describe, expect, test } from 'vitest';

import { RegistrationForm, RegistrationFormProps } from './form';

import '@testing-library/jest-dom/vitest';
import {
	RenderResult,
	act,
	fireEvent,
	handlers,
	render,
	server,
	waitFor
} from '~/test-utils';

describe('features/auth/registration/ui/form.tsx', () => {
	const values = {
		email: 'email@example.com',
		username: 'username',
		password: 'password',
		repeatPassword: 'password',
	};

	let wrapper: RenderResult;

	const createComponent = (props: RegistrationFormProps = {}) => {
		wrapper = render(<RegistrationForm {...props} />);
	};

	const foundForm = () => wrapper.getByRole('form');
	const foundItems = () => ({
		email: wrapper.getByRole('textbox', {
			name: 'registration_form.fields.email',
		}),
		username: wrapper.getByRole('textbox', {
			name: 'registration_form.fields.username',
		}),
		password: wrapper.getByLabelText('registration_form.fields.password'),
		repeatPassword: wrapper.getByLabelText(
			'registration_form.fields.repeat_password'
		),
		submit: wrapper.getByRole('button', { name: 'registration_form.submit', }),
	});
	const fillFields = async (items, values) => {
		fireEvent.input(items.email, {
			target: { value: values.email, },
		});
		fireEvent.input(items.username, {
			target: { value: values.username, },
		});
		fireEvent.input(items.password, {
			target: { value: values.password, },
		});
		fireEvent.input(items.repeatPassword, {
			target: { value: values.repeatPassword, },
		});
	};

	beforeEach(async () => {
		await act(async () => createComponent());
	});

	test('should render form, 4 inputs and button', () => {
		expect(foundForm()).toMatchSnapshot();
	});

	test('should be able to click on button if fields are empty', async () => {
		const { submit, } = foundItems();

		expect(submit).not.toHaveAttribute('disabled', true);

		await wrapper.user.click(submit);
	});

	test('should send registration query with data from fields', async () => {
		const { submit, username, email, password, repeatPassword, } = foundItems();
		fillFields({ email, username, password, repeatPassword, }, values);

		await wrapper.user.click(submit);

		await waitFor(() => {
			expect(email.value).toBe(values.email);
			expect(username.value).toBe(values.username);
			expect(password.value).toBe('');
			expect(repeatPassword.value).toBe('');
		});
	});

	describe('validation', () => {
		describe('username field', () => {
			test('should show error message if the field is empty', async () => {
				const { submit, username, email, password, repeatPassword, } =
					foundItems();
				fillFields(
					{ email, username, password, repeatPassword, },
					{ ...values, username: '', }
				);

				await wrapper.user.click(submit);

				await waitFor(() => {
					const element = wrapper.getByText(
						'registration_form.errors.username.empty'
					);

					expect(element).toBeInTheDocument();
				});
			});

			test('should show error if the field is too short', async () => {
				const { submit, username, email, password, repeatPassword, } =
					foundItems();
				fillFields(
					{ email, username, password, repeatPassword, },
					{ ...values, username: '12', }
				);

				await wrapper.user.click(submit);

				await waitFor(() => {
					const element = wrapper.getByText(
						'registration_form.errors.username.min_length'
					);

					expect(element).toBeInTheDocument();
				});
			});

			test('should show error is the field is too long', async () => {
				const { submit, username, email, password, repeatPassword, } =
					foundItems();
				fillFields(
					{ email, username, password, repeatPassword, },
					{
						...values,
						username:
							'qawdkljhasdkf jnasldjfn asjdfn lasjdfnjlas  dfla lkafnln',
					}
				);

				await wrapper.user.click(submit);

				await waitFor(() => {
					const element = wrapper.getByText(
						'registration_form.errors.username.max_length'
					);

					expect(element).toBeInTheDocument();
				});
			});
		});

		describe('email field', () => {
			test('should show error if the field is empty', async () => {
				const { submit, username, email, password, repeatPassword, } =
					foundItems();
				fillFields(
					{ email, username, password, repeatPassword, },
					{ ...values, email: '', }
				);

				await wrapper.user.click(submit);

				await waitFor(() => {
					const element = wrapper.getByText(
						'registration_form.errors.email.empty'
					);

					expect(element).toBeInTheDocument();
				});
			});

			test('should show error if there is a user with this email', async () => {
				server.use(handlers.auth.error.registration);

				const { submit, email, username, password, repeatPassword, } =
					foundItems();
				fillFields(
					{ email, password, username, repeatPassword, },
					{ ...values, email: 'asd@gmail.com', }
				);

				await wrapper.user.click(submit);

				await waitFor(() => {
					const element = wrapper.getByText(
						'registration_form.errors.email.exists'
					);

					expect(element).toBeInTheDocument();
				});
			});
		});

		describe('password field', () => {
			test('should show error if the field is empty', async () => {
				const { submit, email, username, password, repeatPassword, } =
					foundItems();
				fillFields(
					{ email, password, username, repeatPassword, },
					{ ...values, password: '', }
				);

				await wrapper.user.click(submit);

				await waitFor(() => {
					const element = wrapper.getByText(
						'registration_form.errors.password.empty'
					);

					expect(element).toBeInTheDocument();
				});
			});

			test('should show error if the field is too short', async () => {
				const { submit, email, username, password, repeatPassword, } =
					foundItems();
				fillFields(
					{ email, password, username, repeatPassword, },
					{ ...values, password: 'e@g.c', }
				);

				await wrapper.user.click(submit);

				await waitFor(() => {
					const element = wrapper.getByText(
						'registration_form.errors.password.min_length'
					);

					expect(element).toBeInTheDocument();
				});
			});

			test('should show error if the field is too long', async () => {
				const { submit, email, username, password, repeatPassword, } =
					foundItems();
				fillFields(
					{ email, password, username, repeatPassword, },
					{
						...values,
						password:
							'asdfasdfasdasdfasdfasdfasdfasdfasdffasdfasdfeasdfasdf1123_',
					}
				);

				await wrapper.user.click(submit);

				await waitFor(() => {
					const element = wrapper.getByText(
						'registration_form.errors.password.max_length'
					);

					expect(element).toBeInTheDocument();
				});
			});
		});

		describe('repeat password field', () => {
			test('should show error if the field is not match with `password` one', async () => {
				const { submit, email, username, password, repeatPassword, } =
					foundItems();
				fillFields(
					{ email, password, username, repeatPassword, },
					{ ...values, repeatPassword: 'another-password', }
				);

				await wrapper.user.click(submit);

				await waitFor(() => {
					const element = wrapper.getByText(
						'registration_form.errors.repeat_password.equal'
					);

					expect(element).toBeInTheDocument();
				});
			});
		});
	});
});
