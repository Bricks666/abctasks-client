import * as React from 'react';
import { useGate, useStore } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { authGate, authQuery } from '@/models/auth';
import { LoadingIndicator } from '@/ui/LoadingIndicator';
import { LoadingWrapper } from '@/ui/LoadingWrapper';
import { AppRoutes } from '@/components/AppRoutes';

import styles from './App.module.css';

export const App: React.FC = () => {
	const status = useStore(authQuery.$status);
	const { t } = useTranslation('common');
	useGate(authGate);

	const isLoading = status === 'initial' || status === 'pending';

	return (
		<LoadingWrapper
			className={styles.loading}
			isLoading={isLoading}
			loadingIndicator={<LoadingIndicator text={t('loading')} />}>
			<AppRoutes />
		</LoadingWrapper>
	);
};
