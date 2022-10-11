import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { LoginForm } from '@/components/LoginForm';
import { SaveLink } from '@/components/SaveLink';
import { CommonProps } from '@/interfaces/common';
import { ContentLayout } from '@/ui/ContentLayout';
import { Text } from '@/ui/Text';
import { usePageTitle } from '@/hooks';

import LoginPageStyle from './LoginPage.module.css';

const LoginPage: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('login');
	usePageTitle(t('title'));
	return (
		<div className={className}>
			<ContentLayout className={LoginPageStyle.layout}>
				<Text className={LoginPageStyle.header} component='h2' align='center'>
					{t('title')}
				</Text>
				<LoginForm className={LoginPageStyle.form} />
				<SaveLink className={LoginPageStyle.link} to='/registration'>
					{t('links.registration')}
				</SaveLink>
			</ContentLayout>
		</div>
	);
};
export default LoginPage;
