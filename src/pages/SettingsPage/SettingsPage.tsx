import { Typography } from '@mui/material';
import * as React from 'react';
import SettingsPageNavigation from './SettingsPage.module.css';
import { usePageTitle } from '@/hooks';
import { MainLayout } from '@/layouts';

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
