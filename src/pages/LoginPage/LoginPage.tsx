import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '@/components/LoginForm';
import { SaveLink } from '@/components/SaveLink';
import { CommonProps } from '@/interfaces/common';
import { ContentLayout } from '@/ui/ContentLayout';
import { Text } from '@/ui/Text';
import { usePageTitle } from '@/hooks';
import { AuthLayout } from '@/layouts/AuthLayout';

import styles from './LoginPage.module.css';

const LoginPage: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('login');
	usePageTitle(t('title'));
	return (
		<AuthLayout className={className}>
			<ContentLayout className={styles.layout}>
				<Text className={styles.header} component='h2' align='center'>
					{t('title')}
				</Text>
				<LoginForm className={styles.form} />
				<SaveLink className={styles.link} to='/registration'>
					{t('links.registration')}
				</SaveLink>
			</ContentLayout>
		</AuthLayout>
	);
};
export default LoginPage;
