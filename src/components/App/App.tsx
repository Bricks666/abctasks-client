import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { useIsAuthorizing } from '@/hooks';
import { auth } from '@/models/Auth';
import { routes } from '@/routes';
import { ROUTES } from '@/const';
import { LoadingIndicator } from '@/ui/LoadingIndicator';
import { LoadingWrapper } from '@/ui/LoadingWrapper';
import { AuthRoute } from '../AuthRoute';
import { Header } from '../Header';
import { Popups } from '../Popups';

import AppStyle from './App.module.css';

export const App: React.FC = () => {
	const isAuthorizing = useIsAuthorizing();

	React.useEffect(() => {
		auth();
	}, []);

	return (
		<LoadingWrapper
			className={AppStyle.loading}
			isLoading={isAuthorizing}
			loadingIndicator={<LoadingIndicator text='Загрузка...' />}>
			<Routes>
				<Route path='/login' element={null} />
				<Route path='/registration' element={null} />
				<Route path='*' element={<Header />} />
			</Routes>

			<Routes>
				<Route path='/*' element={<Popups />}>
					{routes.map(({ isOnlyAuth, path, Component }) => (
						<Route
							path={path}
							element={
								<React.Suspense
									fallback={
										<LoadingWrapper
											className={AppStyle.loading}
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
					<Route path='*' element={<Navigate to={ROUTES.ROOMS} replace />} />
				</Route>
			</Routes>
		</LoadingWrapper>
	);
};
