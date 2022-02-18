import React, { FC } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useIsLogin } from "@/hooks";

export const AuthRoute: FC = ({ children }) => {
	const isLogin = useIsLogin();
	const location = useLocation();

	if (!isLogin) {
		return <Navigate to="/login" state={location} replace={true} />;
	}

	return <>{children}</>;
};
