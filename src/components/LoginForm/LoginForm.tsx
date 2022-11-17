import * as React from 'react';
import cn from 'classnames';
import { Button } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation } from '@farfetched/react';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';
import { LoginRequest } from '@/api';
import { loginMutation } from '@/models';
import { CommonProps } from '@/types';
import { Checkbox, Field } from '@/shared/components';
import { validationSchema } from './validator';

import styles from './LoginForm.module.css';

const initialValue: LoginRequest = {
	login: '',
	password: '',
	rememberMe: false,
};

export const LoginForm: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('login');
	const login = useMutation(loginMutation);
	const { handleSubmit, formState, control } = useForm<LoginRequest>({
		defaultValues: initialValue,
		resolver: joiResolver(validationSchema),
	});
	const { isDirty, isSubmitting } = formState;

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
