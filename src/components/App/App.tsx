import React, { FC, Suspense, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useIsAuthorizing } from "@/hooks";
import { auth } from "@/models/Auth";
import { routes } from "@/routes";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { LoadingWrapper } from "@/components/LoadingWrapper";
import { AuthRoute } from "../AuthRoute";
import { Header } from "../Header";
import { Popups } from "../Popups";

import AppStyle from "./App.module.css";
import { ROUTES } from "@/const";

export const App: FC = () => {
	const isAuthorizing = useIsAuthorizing();

	useEffect(() => {
		auth();
	}, []);

	return (
		<LoadingWrapper
			className={AppStyle.loading}
			isLoading={isAuthorizing}
			loadingIndicator={<LoadingIndicator text="Загрузка..." />}
		>
			<Routes>
				<Route path="/login" element={null} />
				<Route path="/registration" element={null} />
				<Route path="*" element={<Header />} />
			</Routes>

			<Routes>
				<Route path="/*" element={<Popups />}>
					{routes.map(({ isOnlyAuth, path, Component }) => (
						<Route
							path={path}
							element={
								<Suspense
									fallback={
										<LoadingWrapper
											className={AppStyle.loading}
											loadingIndicator={<LoadingIndicator text="Загрузка..." />}
											isLoading
										/>
									}
								>
									{isOnlyAuth ? (
										<AuthRoute>
											<Component />
										</AuthRoute>
									) : (
										<Component />
									)}
								</Suspense>
							}
							key={path}
						/>
					))}
					<Route
						path="*"
						element={<Navigate to={ROUTES.ROOMS} replace={true} />}
					/>
				</Route>
			</Routes>
		</LoadingWrapper>
	);
};
