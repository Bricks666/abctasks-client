import { Button } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { MAX_SHORT_LENGTH, MIN_LENGTH } from '@/shared/configs';
import { usePreventDefault } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Checkbox, Field, Form, PasswordField } from '@/shared/ui';

import { form } from './model';
import styles from './ui.module.css';

export const LoginForm: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('login');
	const loginText = t('login_form.submit');
	const submit = useUnit(form.submit);

	const onSubmit = usePreventDefault(submit);

	return (
		<Form className={cn(styles.form, className)} onSubmit={onSubmit}>
			<Email />
			<Password />
			<RememberMe />
			<Button type='submit'>{loginText}</Button>
		</Form>
	);
};

const Email: React.FC = () => {
	const { t, } = useTranslation('login');
	const email = useUnit(form.fields.email);
	const { errorText, } = email;

	const label = t('login_form.fields.email');
	const error = t(
		[`login_form.errors.email.${errorText}`, 'common:errors.default'],
		{
			min_symbols_count: MIN_LENGTH,
			max_symbols_count: MAX_SHORT_LENGTH,
		}
	);
	const errorHelperText = email.isValid ? null : error;

	return (
		<Field
			className={styles.field}
			value={email.value}
			onChange={email.onChange}
			onBlur={email.onBlur}
			helperText={errorHelperText}
			isValid={email.isValid}
			name='Email'
			label={label}
		/>
	);
};

const Password: React.FC = () => {
	const { t, } = useTranslation('login');
	const password = useUnit(form.fields.password);
	const { errorText, } = password;

	const label = t('login_form.fields.password');
	const error = t(
		[`login_form.errors.password.${errorText}`, 'common:errors.default'],
		{
			min_symbols_count: MIN_LENGTH,
			max_symbols_count: MAX_SHORT_LENGTH,
		}
	);
	const errorHelperText = password.isValid ? null : error;

	return (
		<PasswordField
			className={styles.field}
			value={password.value}
			onChange={password.onChange}
			onBlur={password.onBlur}
			helperText={errorHelperText}
			isValid={password.isValid}
			name='password'
			label={label}
		/>
	);
};

const RememberMe: React.FC = () => {
	const { t, } = useTranslation('login');
	const label = t('login_form.fields.remember_me');

	const rememberMe = useUnit(form.fields.rememberMe);

	return (
		<Checkbox
			value={rememberMe.value}
			onChange={rememberMe.onChange}
			name='rememberMe'
			label={label}
		/>
	);
};
