import { useMutation } from '@farfetched/react';
import { joiResolver } from '@hookform/resolvers/joi';
import { Button } from '@mui/material';
import cn from 'classnames';
import * as React from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { RegistrationRequest } from '@/shared/api';
import { CommonProps } from '@/shared/types';
import { Field } from '@/shared/ui';
import { registrationModel } from '../../models';
import styles from './registration-form.module.css';
import { validationSchema } from './validator';

const initialValues: RegistrationRequest = {
	login: '',
	password: '',
	repeatPassword: '',
};

export const RegistrationForm: React.FC<CommonProps> = ({ className, }) => {
	const { t, } = useTranslation('registration');
	const registration = useMutation(registrationModel.registrationMutation);
	const { control, handleSubmit, formState, } = useForm<RegistrationRequest>({
		defaultValues: initialValues,
		resolver: joiResolver(validationSchema),
	});
	const { isSubmitting, isDirty, } = formState;
	return (
		<form
			className={cn(styles.form, className)}
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
		</form>
	);
};
