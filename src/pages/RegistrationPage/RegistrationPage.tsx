import * as React from 'react';
import { Button, Typography } from '@mui/material';
import { Link } from 'atomic-router-react';
import { useTranslation } from 'react-i18next';
import { loginRoute } from '@/routes';
import { AuthLayout } from '@/layouts';
import { RegistrationForm } from '@/components';
import { CommonProps } from '@/types';
import { usePageTitle } from '@/hooks';

import styles from './RegistrationPage.module.css';

const RegistrationPage: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('registration');

	usePageTitle(t('title'));

	return (
		<AuthLayout className={className}>
			<Typography variant='h3' component='h2' align='center'>
				{t('title')}
			</Typography>
			<RegistrationForm />
			<Button className={styles.button} to={loginRoute} component={Link}>
				{t('actions.login')}
			</Button>
		</AuthLayout>
	);
};

export default RegistrationPage;
