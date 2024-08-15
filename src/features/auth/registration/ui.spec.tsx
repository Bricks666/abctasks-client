/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable sonarjs/no-duplicate-string */
import {
	RenderResult,
	fireEvent,
	render,
	waitFor
} from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { describe, expect, test } from 'vitest';

import { RegistrationForm, RegistrationFormProps } from './ui';

import '@testing-library/jest-dom/vitest';
import { server } from '~/test-utils';

describe('features/auth/registration/ui', () => {
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

	test('should render form, 4 inputs and button', () => {
		createComponent();

		expect(foundForm()).toMatchSnapshot();
	});

	test('should be able to click on button if fields are empty', async () => {
		createComponent();

		const { submit, } = foundItems();

		expect(submit).not.toHaveAttribute('disabled', true);

		fireEvent.click(submit);
	});

	test('should send registration query with data from fields', async () => {
		createComponent();

		const { submit, username, email, password, repeatPassword, } = foundItems();
		fillFields({ email, username, password, repeatPassword, }, values);

		fireEvent.click(submit);

		await waitFor(() => {
			expect(email.value).toBe(values.email);
			expect(username.value).toBe(values.username);
			expect(password.value).toBe('');
			expect(repeatPassword.value).toBe('');
		});
	});

	describe('validation', () => {
		describe('username field', () => {
			test('empty field', async () => {
				createComponent();

				const { submit, username, email, password, repeatPassword, } =
					foundItems();
				fillFields(
					{ email, username, password, repeatPassword, },
					{ ...values, username: '', }
				);

				fireEvent.click(submit);

				await waitFor(() => {
					const element = wrapper.getByText(
						'registration_form.errors.username.empty'
					);

					expect(element).toBeInTheDocument();
				});
			});

			test('too short username', async () => {
				createComponent();

				const { submit, username, email, password, repeatPassword, } =
					foundItems();
				fillFields(
					{ email, username, password, repeatPassword, },
					{ ...values, username: '12', }
				);

				fireEvent.click(submit);

				await waitFor(() => {
					const element = wrapper.getByText(
						'registration_form.errors.username.min_length'
					);

					expect(element).toBeInTheDocument();
				});
			});

			test('too long username', async () => {
				createComponent();

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

				fireEvent.click(submit);

				await waitFor(() => {
					const element = wrapper.getByText(
						'registration_form.errors.username.max_length'
					);

					expect(element).toBeInTheDocument();
				});
			});
		});

		describe('email field', () => {
			test('empty field', async () => {
				createComponent();

				const { submit, username, email, password, repeatPassword, } =
					foundItems();
				fillFields(
					{ email, username, password, repeatPassword, },
					{ ...values, email: '', }
				);

				fireEvent.click(submit);

				await waitFor(() => {
					const element = wrapper.getByText(
						'registration_form.errors.email.empty'
					);

					expect(element).toBeInTheDocument();
				});
			});

			test('too short email', async () => {
				createComponent();

				const { submit, email, username, password, repeatPassword, } =
					foundItems();
				fillFields(
					{ email, username, password, repeatPassword, },
					{ ...values, email: 'e@g.c', }
				);

				fireEvent.click(submit);

				await waitFor(() => {
					const element = wrapper.getByText(
						'registration_form.errors.email.min_length'
					);

					expect(element).toBeInTheDocument();
				});
			});

			test('too long email', async () => {
				createComponent();

				const { submit, email, username, password, repeatPassword, } =
					foundItems();
				fillFields(
					{ email, username, password, repeatPassword, },
					{
						...values,
						email:
							'asdfasdfasdasdfasdfasdfasdfasdfasdffasdfasdfeasdfasdf1123@gmail.com',
					}
				);

				fireEvent.click(submit);

				await waitFor(() => {
					const element = wrapper.getByText(
						'registration_form.errors.email.max_length'
					);

					expect(element).toBeInTheDocument();
				});
			});

			test('there is not user with this email', async () => {
				server.use(
					http.post('/api/auth/registration', () => {
						return HttpResponse.json(
							{
								message: 'Conflict',
							},
							{ status: 409, statusText: 'Conflict', }
						);
					})
				);

				createComponent();

				const { submit, email, username, password, repeatPassword, } =
					foundItems();
				fillFields(
					{ email, password, username, repeatPassword, },
					{ ...values, email: 'asd@gmail.com', }
				);

				fireEvent.click(submit);

				await waitFor(() => {
					const element = wrapper.getByText(
						'registration_form.errors.email.exists'
					);

					expect(element).toBeInTheDocument();
				});
			});
		});

		describe('password field', () => {
			test('empty field', async () => {
				createComponent();

				const { submit, email, username, password, repeatPassword, } =
					foundItems();
				fillFields(
					{ email, password, username, repeatPassword, },
					{ ...values, password: '', }
				);

				fireEvent.click(submit);

				await waitFor(() => {
					const element = wrapper.getByText(
						'registration_form.errors.password.empty'
					);

					expect(element).toBeInTheDocument();
				});
			});

			test('too short password', async () => {
				createComponent();

				const { submit, email, username, password, repeatPassword, } =
					foundItems();
				fillFields(
					{ email, password, username, repeatPassword, },
					{ ...values, password: 'e@g.c', }
				);

				fireEvent.click(submit);

				await waitFor(() => {
					const element = wrapper.getByText(
						'registration_form.errors.password.min_length'
					);

					expect(element).toBeInTheDocument();
				});
			});

			test('too long password', async () => {
				createComponent();

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

				fireEvent.click(submit);

				await waitFor(() => {
					const element = wrapper.getByText(
						'registration_form.errors.password.max_length'
					);

					expect(element).toBeInTheDocument();
				});
			});
		});

		describe.skip('repeat password field', () => {
			test('different passwords', async () => {
				createComponent();

				const { submit, email, username, password, repeatPassword, } =
					foundItems();
				fillFields(
					{ email, password, username, repeatPassword, },
					{ ...values, repeatPassword: 'another-password', }
				);

				fireEvent.click(submit);

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
