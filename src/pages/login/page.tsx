import { Button, Typography } from '@mui/material';
import { Link } from 'atomic-router-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '@/features/auth';
import { routes } from '@/shared/configs';
import { usePageTitle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { AuthLayout } from '@/shared/ui';

import styles from './styles.module.css';

const LoginPage: React.FC<CommonProps> = ({ className, }) => {
	const { t, } = useTranslation('login');
	usePageTitle(t('title'));

	return (
		<AuthLayout className={className}>
			<Typography variant='h3' component='h2' align='center'>
				{t('title')}
			</Typography>
			<LoginForm />
			<Button
				className={styles.button}
				to={routes.registration}
				component={Link}>
				{t('actions.registration')}
			</Button>
		</AuthLayout>
	);
};
export default LoginPage;
