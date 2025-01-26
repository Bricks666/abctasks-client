/* eslint-disable import/no-extraneous-dependencies */
import { describe, expect, test } from 'vitest';

import {
	handlers,
	server,
	RenderResult,
	fireEvent,
	render,
	waitFor,
	act
} from '~/test-utils';

import { LoginForm, LoginFormProps } from './login-form';


describe('features/auth/login/ui/login-form/login-form.tsx', () => {
	const values = {
		email: 'email@example.com',
		password: 'password',
		rememberMe: false,
	};

	let wrapper: RenderResult;

	const createComponent = (props: LoginFormProps = {}) => {
		wrapper = render(<LoginForm {...props} />);
	};

	const findForm = () => wrapper.getByRole('form') as HTMLFormElement;
	const findEmailField = () =>
		wrapper.getByRole('textbox', {
			name: 'login_form.fields.email',
		}) as HTMLInputElement;
	const findPasswordField = () =>
		wrapper.getByLabelText('login_form.fields.password') as HTMLInputElement;
	const findRememberCheckbox = () =>
		wrapper.getByRole('checkbox', {
			name: 'login_form.fields.remember_me',
		}) as HTMLInputElement;
	const findSubmitButton = () =>
		wrapper.getByRole('button', {
			name: 'login_form.submit',
		}) as HTMLButtonElement;

	const setValues = async (items, values) => {
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

	test('should render form, 3 inputs and button', async () => {
		await act(async () => createComponent());

		expect(findForm()).toMatchSnapshot();
	});

	test('should be able to click on button if fields are empty', async () => {
		await act(async () => createComponent());

		const submit = findSubmitButton();

		expect(submit).not.toHaveAttribute('disabled', true);

		await wrapper.user.click(submit);
	});

	test('should send login query with data from fields', async () => {
		await act(async () => createComponent());

		const email = findEmailField();
		const password = findPasswordField();
		const rememberMe = findRememberCheckbox();

		await setValues({ email, password, rememberMe, }, values);

		await wrapper.user.click(findSubmitButton());

		await waitFor(() => {
			expect(email.value).toBe(values.email);
			expect(password.value).toBe('');
			expect(rememberMe.checked).toBe(values.rememberMe);
		});
	});

	describe('validation', () => {
		describe('email field', () => {
			test('empty field', async () => {
				await act(async () => createComponent());

				const email = findEmailField();
				const password = findPasswordField();
				const rememberMe = findRememberCheckbox();

				setValues({ email, password, rememberMe, }, { ...values, email: '', });

				await wrapper.user.click(findSubmitButton());

				await waitFor(() => {
					const element = wrapper.getByText('login_form.errors.email.empty');

					expect(element).toBeInTheDocument();
				});
			});

			test('invalid pattern', async () => {
				await act(async () => createComponent());

				const email = findEmailField();
				const password = findPasswordField();
				const rememberMe = findRememberCheckbox();
				setValues(
					{ email, password, rememberMe, },
					{ ...values, email: 'email.com', }
				);

				await wrapper.user.click(findSubmitButton());

				await waitFor(() => {
					const element = wrapper.getByText('login_form.errors.email.email');

					expect(element).toBeInTheDocument();
				});
			});

			test('there is not user with this email', async () => {
				server.use(handlers.auth.error.login.notFound);

				await act(async () => createComponent());

				const email = findEmailField();
				const password = findPasswordField();
				const rememberMe = findRememberCheckbox();
				setValues(
					{ email, password, rememberMe, },
					{ ...values, email: 'asd@gmail.com', }
				);

				await wrapper.user.click(findSubmitButton());

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
				await act(async () => createComponent());

				const email = findEmailField();
				const password = findPasswordField();
				const rememberMe = findRememberCheckbox();
				setValues({ email, password, rememberMe, }, { ...values, password: '', });

				await wrapper.user.click(findSubmitButton());

				await waitFor(() => {
					const element = wrapper.getByText('login_form.errors.password.empty');

					expect(element).toBeInTheDocument();
				});
			});

			test('too short password', async () => {
				await act(async () => createComponent());

				const email = findEmailField();
				const password = findPasswordField();
				const rememberMe = findRememberCheckbox();
				setValues(
					{ email, password, rememberMe, },
					{ ...values, password: 'e@g.c', }
				);

				await wrapper.user.click(findSubmitButton());

				await waitFor(() => {
					const element = wrapper.getByText(
						'login_form.errors.password.min_length'
					);

					expect(element).toBeInTheDocument();
				});
			});

			test('too long password', async () => {
				await act(async () => createComponent());

				const email = findEmailField();
				const password = findPasswordField();
				const rememberMe = findRememberCheckbox();
				setValues(
					{ email, password, rememberMe, },
					{
						...values,
						password:
							'asdfasdfasdasdfasdfasdfasdfasdfasdffasdfasdfeasdfasdf1123_',
					}
				);

				await wrapper.user.click(findSubmitButton());

				await waitFor(() => {
					const element = wrapper.getByText(
						'login_form.errors.password.max_length'
					);

					expect(element).toBeInTheDocument();
				});
			});

			test('incorrect password', async () => {
				server.use(handlers.auth.error.login.forbidden);

				await act(async () => createComponent());

				const email = findEmailField();
				const password = findPasswordField();
				const rememberMe = findRememberCheckbox();
				setValues(
					{ email, password, rememberMe, },
					{ ...values, password: 'asd@gmail.com', }
				);

				await wrapper.user.click(findSubmitButton());

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
