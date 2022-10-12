import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import cn from 'classnames';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';
import { useMutation } from '@farfetched/react';
import { RegistrationRequest, registrationMutation } from '@/models/auth';
import { Button } from '@/ui/Button';
import { TextField } from '../TextField';
import { validationSchema } from './validator';
import { CommonProps } from '@/types/common';

import styles from './RegistrationForm.module.css';

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
			<TextField
				{...register('repeatPassword')}
				label={t('fields.passwordRepeat')}
				type='password'
				disabled={isSubmitting}
				error={errors.repeatPassword?.message}
			/>
			<Button className={styles.button} disabled={!isDirty || isSubmitting}>
				{t('buttons.submit')}
			</Button>
		</form>
	);
};
