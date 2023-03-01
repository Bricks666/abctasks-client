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
	const { fields, submit, } = useForm(registrationModel.form);
	const { email, password, repeatPassword, } = fields;

	const onSubmit: React.FormEventHandler = (e) => {
		e.preventDefault();
		submit();
	};

	return (
		<form className={cn(styles.form, className)} onSubmit={onSubmit}>
			<Field
				value={email.value}
				onChange={email.onChange}
				onBlur={email.onBlur}
				helperText={email.errorText()}
				isValid={email.isValid}
				name={email.name}
				label='Email'
				autoComplete='new-password'
			/>
			<Field
				value={password.value}
				onChange={password.onChange}
				onBlur={password.onBlur}
				helperText={password.errorText()}
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
				helperText={repeatPassword.errorText()}
				isValid={repeatPassword.isValid}
				name={repeatPassword.name}
				type='password'
				label={t('fields.passwordRepeat')}
				autoComplete='new-password'
			/>
			<Button type='submit' variant='outlined'>
				{t('actions.submit')}
			</Button>
		</form>
	);
};
