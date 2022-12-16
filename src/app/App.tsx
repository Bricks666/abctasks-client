import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Pages } from '@/pages';
import { useAuth } from '@/entities/auth';
import { LoadingWrapper, LoadingIndicator } from '@/shared/ui';
import styles from './App.module.css';
import { withProviders } from './providers';

export const App = withProviders(() => {
	const { status, } = useAuth();
	const { t, } = useTranslation('common');

	const isLoading = status === 'initial' || status === 'pending';

	return (
		<LoadingWrapper
			className={styles.loading}
			isLoading={isLoading}
			loadingIndicator={<LoadingIndicator text={t('loading')} />}>
			<Pages />
		</LoadingWrapper>
	);
});
