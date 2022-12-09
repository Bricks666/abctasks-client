import * as React from 'react';
import { Link } from 'atomic-router-react';
import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { registrationRoute } from '@/routes';
import { usePageTitle } from '@/hooks';
import { CommonProps } from '@/types';
import { AuthLayout } from '@/layouts';
import { LoginForm } from '@/components';

import styles from './LoginPage.module.css';

const LoginPage: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('login');
	usePageTitle(t('title'));

	return (
		<AuthLayout className={className}>
			<Typography variant='h3' component='h2' align='center'>
				{t('title')}
			</Typography>
			<LoginForm />
			<Button className={styles.button} to={registrationRoute} component={Link}>
				{t('actions.registration')}
			</Button>
		</AuthLayout>
	);
};
export default LoginPage;
