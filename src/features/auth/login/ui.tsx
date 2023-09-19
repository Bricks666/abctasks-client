import { Button } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { usePreventDefault } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Checkbox, Field, Form, PasswordField } from '@/shared/ui';

import { form } from './model';
import styles from './ui.module.css';

export const LoginForm: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('login');
	const submit = useUnit(form.submit);

	const onSubmit = usePreventDefault(submit);

	return (
		<Form className={cn(styles.form, className)} onSubmit={onSubmit}>
			<Email />
			<Password />
			<RememberMe />
			<Button type='submit'>{t('actions.submit')}</Button>
		</Form>
	);
};

const Email: React.FC = () => {
	const email = useUnit(form.fields.email);

	return (
		<Field
			className={styles.field}
			value={email.value}
			onChange={email.onChange}
			onBlur={email.onBlur}
			helperText={email.errorText}
			isValid={email.isValid}
			name='Email'
			label='Почта'
		/>
	);
};

const Password: React.FC = () => {
	const password = useUnit(form.fields.password);

	return (
		<PasswordField
			className={styles.field}
			value={password.value}
			onChange={password.onChange}
			onBlur={password.onBlur}
			helperText={password.errorText}
			isValid={password.isValid}
			name='password'
			label='Пароль'
		/>
	);
};

const RememberMe: React.FC = () => {
	const rememberMe = useUnit(form.fields.rememberMe);

	return (
		<Checkbox
			value={rememberMe.value}
			onChange={rememberMe.onChange}
			name='rememberMe'
			label='Запомнить меня'
		/>
	);
};
