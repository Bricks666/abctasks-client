import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useStore } from 'effector-react';
import { $IsAuth } from '@/models/auth';
import { CommonProps } from '@/types/common';
import { AuthLayout } from '@/layouts/AuthLayout';
import { LoginForm } from '@/components/LoginForm';
import { SaveLink } from '@/components/SaveLink';
import { ContentLayout } from '@/ui/ContentLayout';
import { Text } from '@/ui/Text';
import { usePageTitle } from '@/hooks';

import styles from './LoginPage.module.css';

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
