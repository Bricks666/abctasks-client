import { useGate, useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Pages } from '@/pages';
import { Popups } from '@/shared/components';
import { AuthGate, authQuery } from '@/shared/models';
import { LoadingWrapper, LoadingIndicator } from '@/shared/ui';
import styles from './App.module.css';
import { withProviders } from './providers';

export const App: React.FC = withProviders(() => {
	const status = useUnit(authQuery.$status);
	const { t, } = useTranslation('common');
	useGate(AuthGate);

	const isLoading = status === 'initial' || status === 'pending';

	return (
		<LoadingWrapper
			className={styles.loading}
			isLoading={isLoading}
			loadingIndicator={<LoadingIndicator text={t('loading')} />}>
			<Pages />
			<Popups />
		</LoadingWrapper>
	);
});
