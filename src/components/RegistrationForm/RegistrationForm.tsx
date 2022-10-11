import * as React from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import cn from 'classnames';
import { joiResolver } from '@hookform/resolvers/joi';
import { Location, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RegistrationRequest } from '@/interfaces/requests';
import { clearRegistrationError, registrationFx } from '@/models/Auth';
import { useLocationState } from '@/hooks';
import { Button } from '@/ui/Button';
import { TextField } from '../TextField';
import { validationSchema } from './validator';
import { useRegistrationError } from './hooks';
import { Alert } from '@/ui/Alert';
import { AlertTitle } from '@/ui/AlertTitle';
import { CommonProps } from '@/interfaces/common';

import styles from './RegistrationForm.module.css';

const initialValues: RegistrationRequest = {
	login: '',
	password: '',
	repeatPassword: '',
};

export const RegistrationForm: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('registration');
	const { register, handleSubmit, formState } = useForm<RegistrationRequest>({
		defaultValues: initialValues,
		resolver: joiResolver(validationSchema),
	});
	const navigate = useNavigate();
	const state = useLocationState<Location>();
	const onSubmit = React.useCallback<SubmitHandler<RegistrationRequest>>(
		async (values) => {
			await registrationFx(values);
			navigate('/login', { replace: true, state });
		},
		[navigate, state]
	);
	const { isSubmitting, isDirty, errors } = formState;
	const error = useRegistrationError();

	React.useEffect(() => {
		return () => {
			clearRegistrationError();
		};
	}, []);

	return (
		<form
			className={cn(styles.form, className)}
			onSubmit={handleSubmit(onSubmit)}>
			{error && (
				<Alert
					type='outline'
					color='error'
					onClose={() => clearRegistrationError()}>
					<AlertTitle>Registration error</AlertTitle>
					This user already registered
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
