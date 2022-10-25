import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button, TextField } from '@mui/material';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@farfetched/react';
import { RegistrationRequest } from '@/api';
import { registrationMutation } from '@/models/auth';
import { CommonProps } from '@/types';
import { validationSchema } from './validator';
import { StyledForm } from './styles';

const initialValues: RegistrationRequest = {
	login: '',
	password: '',
	repeatPassword: '',
};

export const RegistrationForm: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('registration');
	const { start } = useMutation(registrationMutation);
	const { register, handleSubmit, formState } = useForm<RegistrationRequest>({
		defaultValues: initialValues,
		resolver: joiResolver(validationSchema),
	});
	const onSubmit = React.useCallback<SubmitHandler<RegistrationRequest>>(
		async (values) => {
			start(values);
		},
		[]
	);
	const { isSubmitting, isDirty, errors } = formState;
	return (
		<StyledForm className={className} onSubmit={handleSubmit(onSubmit)}>
			<TextField
				label={t('fields.login')}
				disabled={isSubmitting}
				helperText={errors.login?.message}
				error={!!errors.login}
				autoComplete='new-password'
				{...register('login')}
			/>
			<TextField
				type='password'
				label={t('fields.password')}
				disabled={isSubmitting}
				helperText={errors.password?.message}
				error={!!errors.password}
				autoComplete='new-password'
				{...register('password')}
			/>
			<TextField
				type='password'
				label={t('fields.passwordRepeat')}
				disabled={isSubmitting}
				helperText={errors.repeatPassword?.message}
				error={!!errors.repeatPassword}
				autoComplete='new-password'
				{...register('repeatPassword')}
			/>
			<Button
				disabled={!isDirty || isSubmitting}
				type='submit'
				variant='outlined'>
				{t('actions.submit')}
			</Button>
		</StyledForm>
	);
};
