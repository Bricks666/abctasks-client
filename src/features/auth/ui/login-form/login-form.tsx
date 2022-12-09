import { useMutation } from '@farfetched/react';
import { joiResolver } from '@hookform/resolvers/joi';
import { Button } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { LoginRequest } from '@/shared/api';
import { CommonProps } from '@/shared/types';
import { Checkbox, Field } from '@/shared/ui';
import { loginModel } from '../../models';
import styles from './login-form.module.css';
import { validationSchema } from './validator';

const initialValue: LoginRequest = {
	login: '',
	password: '',
	rememberMe: false,
};

export const LoginForm: React.FC<CommonProps> = ({ className, }) => {
	const { t, } = useTranslation('login');
	const login = useMutation(loginModel.loginMutation);
	const { handleSubmit, formState, control, } = useForm<LoginRequest>({
		defaultValues: initialValue,
		resolver: joiResolver(validationSchema),
	});
	const { isDirty, isSubmitting, } = formState;

	return (
		<form
			className={cn(styles.form, className)}
			onSubmit={handleSubmit(login.start)}>
			<Field
				className={styles.field}
				name='login'
				control={control}
				label={t('fields.login')}
				disabled={isSubmitting}
			/>

			<Field
				className={styles.field}
				name='password'
				control={control}
				label={t('fields.password')}
				type='password'
				disabled={isSubmitting}
			/>
			<Checkbox
				name='rememberMe'
				control={control}
				label={t('fields.remember')}
			/>
			<Button
				type='submit'
				disabled={!isDirty || isSubmitting}
				variant='outlined'>
				{t('actions.submit')}
			</Button>
		</form>
	);
};
