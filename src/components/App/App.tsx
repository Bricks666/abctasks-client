import React, { FC, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useIsAuthorizing } from "../../hooks";
import { auth } from "../../models/User";
import { routes } from "../../routes";
import { LoadingIndicator } from "../../ui/LoadingIndicator";
import { LoadingWrapper } from "../../ui/LoadingWrapper";
import { AuthRoute } from "../AuthRoute";
import { Header } from "../Header";
import { Popups } from "../Popups";

import AppStyle from "./App.module.css";

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
			<Header />
			<Routes>
				<Route path="/*" element={<Popups />}>
					{routes.map(({ isOnlyAuth, path, Component }) => (
						<Route
							path={path}
							element={
								isOnlyAuth ? (
									<AuthRoute>
										<Component />
									</AuthRoute>
								) : (
									<Component />
								)
							}
							key={path}
						/>
					))}
					<Route path="*" element={<Navigate to="/" replace={true} />} />
				</Route>
			</Routes>
		</LoadingWrapper>
	);
};
