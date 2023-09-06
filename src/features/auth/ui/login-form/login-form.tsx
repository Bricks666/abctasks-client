import { Button } from '@mui/material';
import cn from 'classnames';
import { useForm } from 'effector-forms';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { useSubmit } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { Checkbox, Field } from '@/shared/ui';

import { loginModel } from '../../model';

import styles from './login-form.module.css';

export const LoginForm: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('login');
	const { fields, submit, } = useForm(loginModel.form);

	const { email, password, rememberMe, } = fields;
	const onSubmit = useSubmit(submit);

	return (
		<form className={cn(styles.form, className)} onSubmit={onSubmit}>
			<Field
				className={styles.field}
				value={email.value}
				onChange={email.onChange}
				onBlur={email.onBlur}
				helperText={email.errorText()}
				isValid={email.isValid}
				name={email.name}
				label='Email'
			/>

			<Field
				className={styles.field}
				value={password.value}
				onChange={password.onChange}
				onBlur={password.onBlur}
				helperText={password.errorText()}
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
			<Button type='submit' variant='outlined'>
				{t('actions.submit')}
			</Button>
		</form>
	);
};
