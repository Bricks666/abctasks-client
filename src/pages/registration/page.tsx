import { Link as MuiLink, Typography } from '@mui/material';
import { Link } from 'atomic-router-react';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { AuthLayout } from '@/widgets/page';

import { RegistrationForm } from '@/features/auth';

import { routes } from '@/shared/configs';
import { usePageTitle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { PageTitle } from '@/shared/ui';

import styles from './styles.module.css';

const RegistrationPage: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('registration');
	const pageTitle = t('title');
	const loginRightNow = t('login_right_now', {
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
						<br /> {loginRightNow[0]}{' '}
						<MuiLink to={routes.login} component={Link}>
							{loginRightNow[1]}
						</MuiLink>{' '}
						{loginRightNow[2]}
					</Typography>
				}
			/>
			<RegistrationForm className={styles.form} />
		</AuthLayout>
	);
};

export default RegistrationPage;
