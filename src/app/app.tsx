import { useUnit } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import '@/processes/auth';
import '@/processes/device-info-handle';
import { Pages } from '@/pages';
import { authModel } from '@/entities/auth';
import { pageModel } from '@/entities/page';
import { LoadingWrapper, LoadingIndicator } from '@/shared/ui';
import styles from './app.module.css';
import { withProviders } from './providers';

import './index.css';

export const App = withProviders(() => {
	const status = useUnit(authModel.query.$status);
	const { t, } = useTranslation('common');

	const isLoading = status === 'initial' || status === 'pending';

	return (
		<LoadingWrapper
			className={styles.loading}
			isLoading={isLoading}
			loadingIndicator={<LoadingIndicator text={t('loading')} />}>
			<React.Suspense
				fallback={
					<LoadingWrapper
						className={styles.loading}
						loadingIndicator={<LoadingIndicator text={t('loading')} />}
						isLoading
					/>
				}>
				<Pages />
			</React.Suspense>
		</LoadingWrapper>
	);
});

pageModel.loaded();
