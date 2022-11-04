import * as React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CommonProps } from '@/types';
import { routes } from '@/routes';
import { LoadingIndicator } from '@/ui/LoadingIndicator';
import { LoadingWrapper } from '@/ui/LoadingWrapper';
import { AuthRoute } from '../AuthRoute';
import { Popups } from '../Popups';

import styles from './AppRoutes.module.css';

export interface AppRoutesProps extends CommonProps {}

export const AppRoutes: React.FC<AppRoutesProps> = React.memo(
	function AppRoutes() {
		return (
			<Routes>
				<Route path='/*' element={<Popups />}>
					{routes.map(({ isOnlyAuth, path, Component }) => (
						<Route
							path={path}
							element={
								<React.Suspense
									fallback={
										<LoadingWrapper
											className={styles.loading}
											loadingIndicator={<LoadingIndicator text='Загрузка...' />}
											isLoading
										/>
									}>
									{isOnlyAuth ? (
										<AuthRoute>
											<Component />
										</AuthRoute>
									) : (
										<Component />
									)}
								</React.Suspense>
							}
							key={path}
						/>
					))}
				</Route>
			</Routes>
		);
	}
);
