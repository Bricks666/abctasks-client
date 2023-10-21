import { Typography, Link as MuiLink } from '@mui/material';
import { Link } from 'atomic-router-react';
import cn from 'classnames';
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
	const pageTitle = t('title');
	const createRightNow = t('create_right_now', {
		returnObjects: true,
	}) as Array<string>;
	const hasAccountQuestion = t('has_account_question');

	usePageTitle(pageTitle);

	return (
		<AuthLayout className={cn(styles.layout, className)}>
			<PageTitle
				className={styles.title}
				title={pageTitle}
				extra={
					<Typography className={styles.link}>
						<span className={styles.question}>{hasAccountQuestion}</span>
						<br /> {createRightNow[0]}{' '}
						<MuiLink to={routes.registration.base} component={Link}>
							{createRightNow[1]}
						</MuiLink>{' '}
						{createRightNow[2]}
					</Typography>
				}
			/>
			<LoginForm className={styles.form} />
		</AuthLayout>
	);
};

export default LoginPage;
