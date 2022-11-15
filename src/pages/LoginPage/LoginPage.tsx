import * as React from 'react';
import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { usePageTitle } from '@/hooks';
import { CommonProps } from '@/types';
import { AuthLayout } from '@/layouts';
import { LoginForm } from '@/components/LoginForm';
import { StyledLink } from './styles';

const LoginPage: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('login');
	usePageTitle(t('title'));

	return (
		<AuthLayout className={className}>
			<Typography variant='h3' component='h2' align='center'>
				{t('title')}
			</Typography>
			<LoginForm />
			<StyledLink to='/registration'>{t('actions.registration')}</StyledLink>
		</AuthLayout>
	);
};
export default LoginPage;
