import React, { FC, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useIsAuthorizing } from "../../hooks";
import { authFx } from "../../models/User";
import { routes } from "../../routes";
import { LoadingWrapper } from "../../ui/LoadingWrapper";
import { AuthRoute } from "../AuthRoute";

export const App: FC = () => {
	const isAuthorizing = useIsAuthorizing();

	useEffect(() => {
		authFx();
	}, []);


	return (
		<LoadingWrapper
			isLoading={isAuthorizing}
			loadingIndicator={<h2>Загрузка...</h2>}
		>
			<Routes>
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
			</Routes>
		</LoadingWrapper>
	);
};
