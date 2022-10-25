import * as React from 'react';
import { Button, TextField } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@farfetched/react';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';
import { LoginRequest } from '@/api';
import { loginMutation } from '@/models/auth';
import { Checkbox } from '../Checkbox';
import { validationSchema } from './validator';
import { CommonProps } from '@/types';
import { StyledWrapper } from './styles';

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
		<StyledWrapper className={className} onSubmit={handleSubmit(onSubmit)}>
			<TextField
				className='field'
				label={t('fields.login')}
				disabled={isSubmitting}
				helperText={errors.login?.message}
				error={!!errors.login}
				{...register('login')}
			/>

			<TextField
				className='field'
				label={t('fields.password')}
				type='password'
				disabled={isSubmitting}
				helperText={errors.password?.message}
				error={!!errors.login}
				{...register('password')}
			/>
			<Checkbox {...register('rememberMe')} label={t('fields.remember')} />
			<Button
				type='submit'
				disabled={!isDirty || isSubmitting}
				variant='outlined'>
				{t('actions.submit')}
			</Button>
		</StyledWrapper>
	);
};
