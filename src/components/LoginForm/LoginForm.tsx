import * as React from 'react';
import cn from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@farfetched/react';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';
import { Button } from '@/ui/Button';
import { loginMutation, LoginRequest } from '@/models/auth';
import { Checkbox } from '../Checkbox';
import { validationSchema } from './validator';
import { TextField } from '../TextField';
import { CommonProps } from '@/types/common';

import styles from './LoginForm.module.css';

const initialValue: LoginRequest = {
	login: '',
	password: '',
	rememberMe: false,
};

export const LoginForm: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('login');
	const login = useMutation(loginMutation);
	const { register, handleSubmit, formState } = useForm<LoginRequest>({
		defaultValues: initialValue,
		resolver: joiResolver(validationSchema),
	});
	const { isDirty, isSubmitting, errors } = formState;
	const onSubmit = React.useCallback<SubmitHandler<LoginRequest>>(
		async (values) => {
			login.start(values);
		},
		[]
	);

	return (
		<form
			className={cn(styles.form, className)}
			onSubmit={handleSubmit(onSubmit)}>
			<TextField
				{...register('login')}
				label={t('fields.login')}
				disabled={isSubmitting}
				error={errors.login?.message}
			/>

			<TextField
				{...register('password')}
				label={t('fields.password')}
				type='password'
				disabled={isSubmitting}
				error={errors.password?.message}
			/>
			<Checkbox {...register('rememberMe')} label={t('fields.remember')} />
			<Button disabled={!isDirty || isSubmitting} type='filed'>
				{t('buttons.submit')}
			</Button>
		</form>
	);
};
