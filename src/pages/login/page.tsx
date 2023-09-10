import { Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'atomic-router-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { LoginForm } from '@/features/auth';

import { routes } from '@/shared/configs';
import { usePageTitle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { AuthLayout, PageTitle } from '@/shared/ui';

import styles from './styles.module.css';

const LoginPage: React.FC<CommonProps> = ({ className, }) => {
	const { t, } = useTranslation('login');
	usePageTitle(t('title'));

	return (
		<AuthLayout className={className}>
			<PageTitle
				className={styles.title}
				title={t('title')}
				extra={
					<Typography className={styles.link}>
						<span className={styles.question}>Еще нет аккаунта?</span>
						<br /> Тогда{' '}
						<MuiLink to={routes.registration.base} component={Link}>
							создайте его
						</MuiLink>{' '}
						прямо сейчас
					</Typography>
				}
			/>
			<LoginForm />
		</AuthLayout>
	);
};

export default LoginPage;
