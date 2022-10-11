import * as React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ROUTES } from '@/const';
import { UpdateProfile } from './UpdateProfile';

import styles from './SettingsContent.module.css';

export const SettingsContent: React.FC = () => {
	return (
		<Routes>
			<Route
				path={ROUTES.SETTINGS_PROFILE}
				element={<UpdateProfile className={styles.content} />}
			/>
			<Route path='*' element={<Navigate to={ROUTES.SETTINGS_PROFILE} />} />
		</Routes>
	);
};
