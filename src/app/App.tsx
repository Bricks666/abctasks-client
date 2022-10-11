import * as React from 'react';
import { authQuery } from '@/models/auth';
import { LoadingIndicator } from '@/ui/LoadingIndicator';
import { LoadingWrapper } from '@/ui/LoadingWrapper';
import { AppRoutes } from '@/components/AppRoutes';
import { useImminentlyQuery } from '@/hooks';

import styles from './App.module.css';

export const App: React.FC = () => {
	const { pending } = useImminentlyQuery(authQuery, undefined);

	return (
		<LoadingWrapper
			className={styles.loading}
			isLoading={pending}
			loadingIndicator={<LoadingIndicator text='Загрузка...' />}>
			<AppRoutes />
		</LoadingWrapper>
	);
};
