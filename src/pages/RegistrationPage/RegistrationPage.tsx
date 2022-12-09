import { Button, Typography } from '@mui/material';
import { Link } from 'atomic-router-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { RegistrationForm } from '@/features/auth';
import { usePageTitle } from '@/shared/hooks';
import { AuthLayout } from '@/shared/layouts';
import { routes } from '@/shared/models';
import { CommonProps } from '@/shared/types';
import styles from './RegistrationPage.module.css';

const RegistrationPage: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('registration');

	usePageTitle(t('title'));

	return (
		<AuthLayout className={className}>
			<Typography variant='h3' component='h2' align='center'>
				{t('title')}
			</Typography>
			<RegistrationForm />
			<Button className={styles.button} to={routes.login} component={Link}>
				{t('actions.login')}
			</Button>
		</AuthLayout>
	);
};

export default RegistrationPage;
