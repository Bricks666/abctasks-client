import * as React from 'react';
import { Navigate } from 'react-router-dom';
import { ROUTES } from '@/const';

const NotFoundPage: React.FC = () => {
	return <Navigate to={ROUTES.ROOMS} replace />;
};

export default NotFoundPage;
