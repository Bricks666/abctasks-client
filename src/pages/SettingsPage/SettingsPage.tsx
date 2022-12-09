import * as React from 'react';
import { Typography } from '@mui/material';
import { usePageTitle } from '@/hooks';
import { MainLayout } from '@/layouts';

import SettingsPageNavigation from './SettingsPage.module.css';

const SettingsPage: React.FC = () => {
	usePageTitle('Settings');
	return (
		<MainLayout>
			<div className={SettingsPageNavigation.header}>
				<Typography component='h2'>Settings</Typography>
			</div>
		</MainLayout>
	);
};

export default SettingsPage;
