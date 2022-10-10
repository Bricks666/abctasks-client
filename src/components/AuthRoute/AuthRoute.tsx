import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useIsLogin } from '@/hooks';

export const AuthRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
	const isLogin = useIsLogin();
	const location = useLocation();

	if (!isLogin) {
		return <Navigate to='/login' state={location} replace />;
	}

	return children as React.ReactElement;
};
