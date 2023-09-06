import { Button } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { useSubmit } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Field, Form, PasswordField } from '@/shared/ui';

import { registrationModel } from '../../model';

import styles from './registration-form.module.css';

export const RegistrationForm: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('registration');
	const submit = useUnit(registrationModel.form.submit);

	const onSubmit = useSubmit(submit);

	return (
		<Form className={cn(styles.form, className)} onSubmit={onSubmit}>
			<Email />
			<Username />
			<Password />
			<RepeatPassword />
			<Button type='submit'>{t('actions.submit')}</Button>
		</Form>
	);
};

const Email: React.FC = () => {
	const email = useUnit(registrationModel.form.fields.email);

	return (
		<Field
			value={email.value}
			onChange={email.onChange}
			onBlur={email.onBlur}
			helperText={email.errorText}
			isValid={email.isValid}
			name='email'
			label='Почта'
			autoComplete='off'
		/>
	);
};

const Username: React.FC = () => {
	const username = useUnit(registrationModel.form.fields.username);

	return (
		<Field
			value={username.value}
			onChange={username.onChange}
			onBlur={username.onBlur}
			helperText={username.errorText}
			isValid={username.isValid}
			name='username'
			label='Ваше имя'
			autoComplete='off'
		/>
	);
};

const Password: React.FC = () => {
	const password = useUnit(registrationModel.form.fields.password);

	return (
		<PasswordField
			value={password.value}
			onChange={password.onChange}
			onBlur={password.onBlur}
			helperText={password.errorText}
			isValid={password.isValid}
			name='password'
			label='Пароль'
			autoComplete='new-password'
		/>
	);
};

const RepeatPassword: React.FC = () => {
	const repeatPassword = useUnit(registrationModel.form.fields.repeatPassword);

	return (
		<PasswordField
			value={repeatPassword.value}
			onChange={repeatPassword.onChange}
			onBlur={repeatPassword.onBlur}
			helperText={repeatPassword.errorText}
			isValid={repeatPassword.isValid}
			name='repeatPassword'
			label='Повторите пароль'
			autoComplete='new-password'
		/>
	);
};
