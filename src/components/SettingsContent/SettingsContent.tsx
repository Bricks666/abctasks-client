import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from '@/const';
import { UpdateProfile } from './UpdateProfile';

import SettingsContentStyle from './SettingsContent.module.css';

export const SettingsContent: React.FC = () => {
	return (
		<Routes>
			<Route
				path={ROUTES.SETTINGS_PROFILE}
				element={<UpdateProfile className={SettingsContentStyle.content} />}
			/>
			<Route path='*' element={<Navigate to={ROUTES.SETTINGS_PROFILE} />} />
		</Routes>
	);
};
