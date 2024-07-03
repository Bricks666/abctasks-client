/* eslint-disable import/no-extraneous-dependencies */
import {
	RenderResult,
	fireEvent,
	render,
	waitFor
} from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { describe, expect, test } from 'vitest';

import { LoginForm, LoginFormProps } from './ui';

import { server } from '~/tests';


import '@testing-library/jest-dom/vitest';

describe('features/auth/login/ui', () => {
	const values = {
		email: 'email@example.com',
		password: 'password',
		rememberMe: false,
	};

	let wrapper: RenderResult;

	const createComponent = (props: LoginFormProps = {}) => {
		wrapper = render(<LoginForm {...props} />);
	};

	const foundForm = () => wrapper.getByRole('form');
	const foundItems = () => ({
		email: wrapper.getByRole('textbox', { name: 'login_form.fields.email', }),
		password: wrapper.getByLabelText('login_form.fields.password'),
		rememberMe: wrapper.getByRole('checkbox', {
			name: 'login_form.fields.remember_me',
		}),
		submit: wrapper.getByRole('button', { name: 'login_form.submit', }),
	});
	const fillFields = async (items, values) => {
		fireEvent.input(items.email, {
			target: { value: values.email, },
		});
		fireEvent.input(items.password, {
			target: { value: values.password, },
		});
		fireEvent.input(items.rememberMe, {
			target: { value: values.rememberMe, },
		});
	};

	test('should render form, 3 inputs and button', () => {
		createComponent();

		expect(foundForm()).toMatchSnapshot();
	});

	test('should be able to click on button if fields are empty', async () => {
		createComponent();

		const { submit, } = foundItems();

		expect(submit).not.toHaveAttribute('disabled', true);

		fireEvent.click(submit);
	});

	test('should send login query with data from fields', async () => {
		createComponent();

		const { submit, email, password, rememberMe, } = foundItems();
		fillFields({ email, password, rememberMe, }, values);

		fireEvent.click(submit);

		await waitFor(() => {
			expect(email.value).toBe(values.email);
			expect(password.value).toBe('');
			expect(rememberMe.checked).toBe(values.rememberMe);
		});
	});

	describe('validation', () => {
		describe('email field', () => {
			test('empty field', async () => {
				createComponent();

				const { submit, email, password, rememberMe, } = foundItems();
				fillFields({ email, password, rememberMe, }, { ...values, email: '', });

				fireEvent.click(submit);

				await waitFor(() => {
					const element = wrapper.getByText('login_form.errors.email.empty');

					expect(element).toBeInTheDocument();
				});
			});

			test('invalid pattern', async () => {
				createComponent();

				const { submit, email, password, rememberMe, } = foundItems();
				fillFields(
					{ email, password, rememberMe, },
					{ ...values, email: 'email.com', }
				);

				fireEvent.click(submit);

				await waitFor(() => {
					const element = wrapper.getByText('login_form.errors.email.email');

					expect(element).toBeInTheDocument();
				});
			});

			test('too short email', async () => {
				createComponent();

				const { submit, email, password, rememberMe, } = foundItems();
				fillFields(
					{ email, password, rememberMe, },
					{ ...values, email: 'e@g.c', }
				);

				fireEvent.click(submit);

				await waitFor(() => {
					const element = wrapper.getByText(
						'login_form.errors.email.min_length'
					);

					expect(element).toBeInTheDocument();
				});
			});

			test('too long email', async () => {
				createComponent();

				const { submit, email, password, rememberMe, } = foundItems();
				fillFields(
					{ email, password, rememberMe, },
					{
						...values,
						email:
							'asdfasdfasdasdfasdfasdfasdfasdfasdffasdfasdfeasdfasdf1123@gmail.com',
					}
				);

				fireEvent.click(submit);

				await waitFor(() => {
					const element = wrapper.getByText(
						'login_form.errors.email.max_length'
					);

					expect(element).toBeInTheDocument();
				});
			});

			test('there is not user with this email', async () => {
				server.use(
					http.post('/api/auth/login', () => {
						return HttpResponse.json(
							{
								message: 'Not Found',
							},
							{ status: 404, statusText: 'Not Found', }
						);
					})
				);

				createComponent();

				const { submit, email, password, rememberMe, } = foundItems();
				fillFields(
					{ email, password, rememberMe, },
					{ ...values, email: 'asd@gmail.com', }
				);

				fireEvent.click(submit);

				await waitFor(() => {
					const element = wrapper.getByText(
						'login_form.errors.email.not_found'
					);

					expect(element).toBeInTheDocument();
				});
			});
		});
		describe('password field', () => {
			test('empty field', async () => {
				createComponent();

				const { submit, email, password, rememberMe, } = foundItems();
				fillFields(
					{ email, password, rememberMe, },
					{ ...values, password: '', }
				);

				fireEvent.click(submit);

				await waitFor(() => {
					const element = wrapper.getByText('login_form.errors.password.empty');

					expect(element).toBeInTheDocument();
				});
			});

			test('too short password', async () => {
				createComponent();

				const { submit, email, password, rememberMe, } = foundItems();
				fillFields(
					{ email, password, rememberMe, },
					{ ...values, password: 'e@g.c', }
				);

				fireEvent.click(submit);

				await waitFor(() => {
					const element = wrapper.getByText(
						'login_form.errors.password.min_length'
					);

					expect(element).toBeInTheDocument();
				});
			});

			test('too long password', async () => {
				createComponent();

				const { submit, email, password, rememberMe, } = foundItems();
				fillFields(
					{ email, password, rememberMe, },
					{
						...values,
						password:
							'asdfasdfasdasdfasdfasdfasdfasdfasdffasdfasdfeasdfasdf1123_',
					}
				);

				fireEvent.click(submit);

				await waitFor(() => {
					const element = wrapper.getByText(
						'login_form.errors.password.max_length'
					);

					expect(element).toBeInTheDocument();
				});
			});

			test('incorrect password', async () => {
				server.use(
					http.post('/api/auth/login', () => {
						return HttpResponse.json(
							{
								message: 'Forbidden',
							},
							{ status: 403, statusText: 'Forbidden', }
						);
					})
				);

				createComponent();

				const { submit, email, password, rememberMe, } = foundItems();
				fillFields(
					{ email, password, rememberMe, },
					{ ...values, password: 'asd@gmail.com', }
				);

				fireEvent.click(submit);

				await waitFor(() => {
					const element = wrapper.getByText(
						'login_form.errors.password.incorrect_password'
					);

					expect(element).toBeInTheDocument();
				});
			});
		});
	});
});
