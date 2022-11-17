import * as React from 'react';
import { useGate, useUnit } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { AuthGate, authQuery } from '@/models';
import { Popups, AppRoutes } from '@/components';
import { LoadingWrapper, LoadingIndicator } from '@/shared/components';

import styles from './App.module.css';

export const App: React.FC = () => {
	const status = useUnit(authQuery.$status);
	const { t } = useTranslation('common');
	useGate(AuthGate);

	const isLoading = status === 'initial' || status === 'pending';

	return (
		<LoadingWrapper
			className={styles.loading}
			isLoading={isLoading}
			loadingIndicator={<LoadingIndicator text={t('loading')} />}>
			<AppRoutes />
			<Popups />
		</LoadingWrapper>
	);
};
