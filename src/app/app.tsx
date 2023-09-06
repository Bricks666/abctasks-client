import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { LoadingWrapper, LoadingIndicator } from '@/shared/ui';

import styles from './app.module.css';
import { withProviders } from './providers';

import { Pages } from '@/pages';

import './index.css';

export const App = withProviders(() => {
	const { t, } = useTranslation('common');

	return (
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
	);
});
