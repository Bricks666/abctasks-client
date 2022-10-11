import * as React from 'react';
import { Location, useNavigate } from 'react-router-dom';
import cn from 'classnames';
import { SubmitHandler, useForm } from 'react-hook-form';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';
import { LoginRequest } from '@/interfaces/requests';
import { Button } from '@/ui/Button';
import { clearLoginError, loginFx } from '@/models/Auth';
import { useLocationState } from '@/hooks';
import { Checkbox } from '../Checkbox';
import { validationSchema } from './validator';
import { Alert } from '@/ui/Alert';
import { AlertTitle } from '@/ui/AlertTitle';
import { useLoginError } from './hooks';
import { TextField } from '../TextField';
import { CommonProps } from '@/interfaces/common';

import LoginFormStyle from './LoginForm.module.css';

const initialValue: LoginRequest = {
	login: '',
	password: '',
	rememberMe: false,
};

export const LoginForm: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('login');
	const { register, handleSubmit, formState } = useForm<LoginRequest>({
		defaultValues: initialValue,
		resolver: joiResolver(validationSchema),
	});
	const navigate = useNavigate();
	const state = useLocationState<Location>();
	const { isDirty, isSubmitting, errors } = formState;
	const onSubmit = React.useCallback<SubmitHandler<LoginRequest>>(
		async (values) => {
			await loginFx(values);
			const to = state || '/';

			navigate(to, { replace: true });
		},
		[navigate, state]
	);
	/* TODO: Make error typing */
	const error = useLoginError();
	React.useEffect(() => {
		return () => {
			clearLoginError();
		};
	}, []);

	return (
		<form
			className={cn(LoginFormStyle.form, className)}
			onSubmit={handleSubmit(onSubmit)}>
			{error && (
				<Alert color='error' type='outline' onClose={() => clearLoginError()}>
					<AlertTitle>Authorization error</AlertTitle>
					Incorrect login or password
				</Alert>
			)}
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
