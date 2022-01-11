import React, { FC } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { routes } from "../../routes";

export const App: FC = () => {
	return (
		<Routes>
			{routes.map(({ path, Component }) => {
				return <Route path={path} element={<Component />} key={path} />;
			})}
			<Route path="*" element={<Navigate to="/" replace={true} />} />
		</Routes>
	);
};
