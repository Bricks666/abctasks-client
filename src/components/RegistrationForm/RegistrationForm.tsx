import * as React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@mui/material';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@farfetched/react';
import { RegistrationRequest } from '@/api';
import { registrationMutation } from '@/models/auth';
import { CommonProps } from '@/types';
import { validationSchema } from './validator';
import { StyledForm } from './styles';
import { Field } from '@/ui/Field';

const initialValues: RegistrationRequest = {
	login: '',
	password: '',
	repeatPassword: '',
};

export const RegistrationForm: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('registration');
	const registration = useMutation(registrationMutation);
	const { control, handleSubmit, formState } = useForm<RegistrationRequest>({
		defaultValues: initialValues,
		resolver: joiResolver(validationSchema),
	});
	const { isSubmitting, isDirty } = formState;
	return (
		<StyledForm
			className={className}
			onSubmit={handleSubmit(registration.start)}>
			<Field
				name='login'
				control={control}
				label={t('fields.login')}
				disabled={isSubmitting}
				autoComplete='new-password'
			/>
			<Field
				name='password'
				control={control}
				type='password'
				label={t('fields.password')}
				disabled={isSubmitting}
				autoComplete='new-password'
			/>
			<Field
				name='repeatPassword'
				control={control}
				type='password'
				label={t('fields.passwordRepeat')}
				disabled={isSubmitting}
				autoComplete='new-password'
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
