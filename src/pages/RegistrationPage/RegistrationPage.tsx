import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { RegistrationForm } from '@/components/RegistrationForm';
import { SaveLink } from '@/components/SaveLink';
import { CommonProps } from '@/interfaces/common';
import { ContentLayout } from '@/ui/ContentLayout';
import { Text } from '@/ui/Text';
import { usePageTitle } from '@/hooks';

import RegistrationPageStyle from './RegistrationPage.module.css';

export const RegistrationPage: React.FC<CommonProps> = ({ className }) => {
	const { t } = useTranslation('registration');
	usePageTitle(t('title'));
	return (
		<main className={className}>
			<ContentLayout className={RegistrationPageStyle.layout}>
				<Text className={RegistrationPageStyle.header} component='h2'>
					{t('title')}
				</Text>
				<RegistrationForm className={RegistrationPageStyle.form} />
				<SaveLink className={RegistrationPageStyle.link} to='/login'>
					{t('links.login')}
				</SaveLink>
			</ContentLayout>
		</main>
	);
};
