import * as React from 'react';
import { useIsAuthorizing } from '@/hooks';
import { auth } from '@/models/Auth';
import { LoadingIndicator } from '@/ui/LoadingIndicator';
import { LoadingWrapper } from '@/ui/LoadingWrapper';
import { AppRoutes } from '@/components/AppRoutes';

import styles from './App.module.css';

export const App: React.FC = () => {
	const isAuthorizing = useIsAuthorizing();

	React.useEffect(() => {
		auth();
	}, []);

	return (
		<LoadingWrapper
			className={styles.loading}
			isLoading={isAuthorizing}
			loadingIndicator={<LoadingIndicator text='Загрузка...' />}>
			<AppRoutes />
		</LoadingWrapper>
	);
};
