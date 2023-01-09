import { joiResolver } from '@hookform/resolvers/joi';
import { Button } from '@mui/material';
import cn from 'classnames';
import { useUnit } from 'effector-react';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { LoginParams } from '@/shared/api';
import { CommonProps } from '@/shared/types';
import { Checkbox, Field } from '@/shared/ui';
import { loginModel } from '../../model';
import styles from './login-form.module.css';
import { validationSchema } from './validator';

const initialValue: LoginParams = {
	login: '',
	password: '',
	rememberMe: false,
};

export const LoginForm: React.FC<CommonProps> = ({ className, }) => {
	const { t, } = useTranslation('login');
	const login = useUnit(loginModel.mutation);
	const { handleSubmit, formState, control, } = useForm<LoginParams>({
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
