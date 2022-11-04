import * as React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useStore } from 'effector-react';
import { $IsAuth } from '@/models/auth';

export const AuthRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
	const isLogin = useStore($IsAuth);
	const location = useLocation();

	if (!isLogin) {
		return <Navigate to='/login' state={location} replace />;
	}

	return children as React.ReactElement;
};
