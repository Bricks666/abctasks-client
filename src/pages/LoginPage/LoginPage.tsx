import * as React from 'react';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import { $IsAuth } from '@/models/auth';
import { usePageTitle } from '@/hooks';
import { CommonProps } from '@/types/common';
import { AuthLayout } from '@/layouts/AuthLayout';
import { LoginForm } from '@/components/LoginForm';
import { StyledLink } from './styles';

const LoginPage: React.FC<CommonProps> = ({ className }) => {
	const isAuth = useStore($IsAuth);
	const navigate = useNavigate();
	const { t } = useTranslation('login');
	usePageTitle(t('title'));

	React.useEffect(() => {
		if (isAuth) {
			navigate('/rooms', { replace: true });
		}
	}, [isAuth]);

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
