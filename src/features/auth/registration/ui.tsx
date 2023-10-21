/* eslint-disable sonarjs/no-duplicate-string */
import { Button } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { MIN_LENGTH, MAX_SHORT_LENGTH } from '@/shared/configs';
import { usePreventDefault } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Field, Form, PasswordField } from '@/shared/ui';

import { form, mutation } from './model';
import styles from './ui.module.css';

export const RegistrationForm: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('registration');
	const submit = useUnit(form.submit);
	const pending = useUnit(mutation.$pending);
	const buttonText = t('registration_form.submit');

	const onSubmit = usePreventDefault(submit);

	return (
		<Form className={cn(styles.form, className)} onSubmit={onSubmit}>
			<Email />
			<Username />
			<Password />
			<RepeatPassword />
			<Button type='submit' disabled={pending}>
				{buttonText}
			</Button>
		</Form>
	);
};

const Email: React.FC = () => {
	const { t, } = useTranslation('registration');
	const email = useUnit(form.fields.email);
	const { errorText, } = email;

	const label = t('registration_form.fields.email');
	const error = t(
		[`registration_form.errors.email.${errorText}`, 'common:errors.default'],
		{
			min_symbols_count: MIN_LENGTH,
			max_symbols_count: MAX_SHORT_LENGTH,
		}
	);
	const errorHelperText = email.isValid ? null : error;

	return (
		<Field
			value={email.value}
			onChange={email.onChange}
			onBlur={email.onBlur}
			helperText={errorHelperText}
			isValid={email.isValid}
			name='email'
			label={label}
			autoComplete='off'
		/>
	);
};

const Username: React.FC = () => {
	const { t, } = useTranslation('registration');
	const username = useUnit(form.fields.username);
	const { errorText, } = username;

	const label = t('registration_form.fields.username');
	const error = t(
		[`registration_form.errors.username.${errorText}`, 'common:errors.default'],
		{
			min_symbols_count: MIN_LENGTH,
			max_symbols_count: MAX_SHORT_LENGTH,
		}
	);
	const errorHelperText = username.isValid ? null : error;

	return (
		<Field
			value={username.value}
			onChange={username.onChange}
			onBlur={username.onBlur}
			helperText={errorHelperText}
			isValid={username.isValid}
			name='username'
			label={label}
			autoComplete='off'
		/>
	);
};

const Password: React.FC = () => {
	const { t, } = useTranslation('registration');
	const password = useUnit(form.fields.password);
	const { errorText, } = password;

	const label = t('registration_form.fields.password');
	const error = t(
		[`registration_form.errors.password.${errorText}`, 'common:errors.default'],
		{
			min_symbols_count: MIN_LENGTH,
			max_symbols_count: MAX_SHORT_LENGTH,
		}
	);
	const errorHelperText = password.isValid ? null : error;

	return (
		<PasswordField
			value={password.value}
			onChange={password.onChange}
			onBlur={password.onBlur}
			helperText={errorHelperText}
			isValid={password.isValid}
			name='password'
			label={label}
			autoComplete='new-password'
		/>
	);
};

const RepeatPassword: React.FC = () => {
	const { t, } = useTranslation('registration');
	const repeatPassword = useUnit(form.fields.repeatPassword);
	const { errorText, } = repeatPassword;

	const label = t('registration_form.fields.repeat_password');
	const error = t(
		[
			`registration_form.errors.repeat_password.${errorText}`,
			'common:errors.default'
		],
		{
			min_symbols_count: MIN_LENGTH,
			max_symbols_count: MAX_SHORT_LENGTH,
		}
	);
	const errorHelperText = repeatPassword.isValid ? null : error;

	return (
		<PasswordField
			value={repeatPassword.value}
			onChange={repeatPassword.onChange}
			onBlur={repeatPassword.onBlur}
			helperText={errorHelperText}
			isValid={repeatPassword.isValid}
			name='repeatPassword'
			label={label}
			autoComplete='new-password'
		/>
	);
};
