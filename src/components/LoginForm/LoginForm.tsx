import * as React from 'react';
import { Button } from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useMutation } from '@farfetched/react';
import { joiResolver } from '@hookform/resolvers/joi';
import { useTranslation } from 'react-i18next';
import { LoginRequest } from '@/api';
import { loginMutation } from '@/models/auth';
import { CommonProps } from '@/types';
import { Field } from '@/ui/Field';
import { Checkbox } from '../Checkbox';
import { validationSchema } from './validator';
import { fieldSx, StyledWrapper } from './styles';

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
	const onSubmit = React.useCallback<SubmitHandler<LoginRequest>>(
		async (values) => {
			login.start(values);
		},
		[]
	);

	return (
		<StyledWrapper className={className} onSubmit={handleSubmit(onSubmit)}>
			<Field
				name='login'
				control={control}
				label={t('fields.login')}
				disabled={isSubmitting}
				sx={fieldSx}
			/>

			<Field
				name='password'
				control={control}
				label={t('fields.password')}
				type='password'
				disabled={isSubmitting}
				sx={fieldSx}
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
		</StyledWrapper>
	);
};
