import { Button } from '@mui/material';
import cn from 'classnames';
import { useForm } from 'effector-forms';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { CommonProps } from '@/shared/types';
import { Field } from '@/shared/ui';
import { registrationModel } from '../../model';
import styles from './registration-form.module.css';

export const RegistrationForm: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('registration');
	const { fields, isDirty, submit, } = useForm(registrationModel.form);
	const { login, password, repeatPassword, } = fields;

	const onSubmit: React.FormEventHandler = (e) => {
		e.preventDefault();
		submit();
	};

	return (
		<form className={cn(styles.form, className)} onSubmit={onSubmit}>
			<Field
				value={login.value}
				onChange={login.onChange}
				onBlur={login.onBlur}
				errorText={login.errorText()}
				isValid={login.isValid}
				name={login.name}
				label={t('fields.login')}
				autoComplete='new-password'
			/>
			<Field
				value={password.value}
				onChange={password.onChange}
				onBlur={password.onBlur}
				errorText={password.errorText()}
				isValid={password.isValid}
				name={password.name}
				type='password'
				label={t('fields.password')}
				autoComplete='new-password'
			/>
			<Field
				value={repeatPassword.value}
				onChange={repeatPassword.onChange}
				onBlur={repeatPassword.onBlur}
				errorText={repeatPassword.errorText()}
				isValid={repeatPassword.isValid}
				name={repeatPassword.name}
				type='password'
				label={t('fields.passwordRepeat')}
				autoComplete='new-password'
			/>
			<Button disabled={!isDirty} type='submit' variant='outlined'>
				{t('actions.submit')}
			</Button>
		</form>
	);
};
