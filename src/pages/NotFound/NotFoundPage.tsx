import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { routes } from '@/const';

const NotFoundPage: React.FC = () => {
	return <Navigate to={routes.ROUTES.ROOMS} replace />;
};

export default NotFoundPage;
