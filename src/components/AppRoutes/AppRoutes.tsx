import * as React from 'react';
import { Route as AtomicRoute } from 'atomic-router-react';
import { CommonProps } from '@/types';
import { routes } from '@/routes';
import { LoadingIndicator } from '@/ui/LoadingIndicator';
import { LoadingWrapper } from '@/ui/LoadingWrapper';

import styles from './AppRoutes.module.css';

export interface AppRoutesProps extends CommonProps {}

export const AppRoutes: React.FC<AppRoutesProps> = React.memo(
	function AppRoutes() {
		return (
			<React.Suspense
				fallback={
					<LoadingWrapper
						className={styles.loading}
						loadingIndicator={<LoadingIndicator size='large' />}
						isLoading
					/>
				}>
				{routes.map((route) => (
					<AtomicRoute
						route={route.route}
						view={route.Component}
						key={route.path}
					/>
				))}
			</React.Suspense>
		);
	}
);
