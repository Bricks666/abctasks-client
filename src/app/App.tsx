import * as React from 'react';
import { authQuery } from '@/models/auth';
import { LoadingIndicator } from '@/ui/LoadingIndicator';
import { LoadingWrapper } from '@/ui/LoadingWrapper';
import { AppRoutes } from '@/components/AppRoutes';
import { useImminentlyQuery } from '@/hooks';

import styles from './App.module.css';

export const App: React.FC = () => {
	const { status } = useImminentlyQuery(authQuery, undefined);
	const isLoading = status === 'initial' || status === 'pending';

	return (
		<LoadingWrapper
			className={styles.loading}
			isLoading={isLoading}
			loadingIndicator={<LoadingIndicator text='Загрузка...' />}>
			<AppRoutes />
		</LoadingWrapper>
	);
};
