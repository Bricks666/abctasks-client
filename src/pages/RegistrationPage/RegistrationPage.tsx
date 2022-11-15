import * as React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AuthLayout } from '@/layouts/AuthLayout';
import { RegistrationForm } from '@/components/RegistrationForm';
import { CommonProps } from '@/types';
import { usePageTitle } from '@/hooks';
import { StyledLink } from './styles';

const RegistrationPage: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('registration');

	usePageTitle(t('title'));

	return (
		<AuthLayout className={className}>
			<Typography variant='h3' component='h2' align='center'>
				{t('title')}
			</Typography>
			<RegistrationForm />
			<StyledLink to='/login'>{t('actions.login')}</StyledLink>
		</AuthLayout>
	);
};

export default RegistrationPage;
