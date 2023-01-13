import { Button } from '@mui/material';
import cn from 'classnames';
import { useForm } from 'effector-forms';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { CommonProps } from '@/shared/types';
import { Checkbox, Field } from '@/shared/ui';
import { loginModel } from '../../model';
import styles from './login-form.module.css';

export const LoginForm: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('login');
	const { fields, submit, isDirty, } = useForm(loginModel.form);

	const { login, password, rememberMe, } = fields;

	const onSubmit: React.FormEventHandler = (e) => {
		e.preventDefault();
		submit();
	};

	return (
		<form className={cn(styles.form, className)} onSubmit={onSubmit}>
			<Field
				className={styles.field}
				value={login.value}
				onChange={login.onChange}
				onBlur={login.onBlur}
				errorText={login.errorText()}
				isValid={login.isValid}
				name={login.name}
				label={t('fields.login')}
			/>

			<Field
				className={styles.field}
				value={password.value}
				onChange={password.onChange}
				onBlur={password.onBlur}
				errorText={password.errorText()}
				isValid={password.isValid}
				name={password.name}
				label={t('fields.password')}
				type='password'
			/>
			<Checkbox
				value={rememberMe.value}
				onChange={rememberMe.onChange}
				name={rememberMe.name}
				label={t('fields.remember')}
			/>
			<Button type='submit' disabled={!isDirty} variant='outlined'>
				{t('actions.submit')}
			</Button>
		</form>
	);
};
