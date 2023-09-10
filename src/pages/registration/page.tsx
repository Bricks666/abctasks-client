import { Link as MuiLink, Typography } from '@mui/material';
import { Link } from 'atomic-router-react';
import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { RegistrationForm } from '@/features/auth';

import { routes } from '@/shared/configs';
import { usePageTitle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { AuthLayout, PageTitle } from '@/shared/ui';

import styles from './styles.module.css';

const RegistrationPage: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('registration');

	usePageTitle(t('title'));

	return (
		<AuthLayout className={cn(styles.layout, className)}>
			<PageTitle
				className={styles.title}
				title={t('title')}
				extra={
					<Typography className={styles.link}>
						<span className={styles.question}>Уже есть аккаунт?</span>
						<br /> Тогда{' '}
						<MuiLink to={routes.login} component={Link}>
							войдите в него
						</MuiLink>{' '}
						прямо сейчас
					</Typography>
				}
			/>
			<RegistrationForm />
		</AuthLayout>
	);
};

export default RegistrationPage;
