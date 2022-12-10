import { Typography } from '@mui/material';
import * as React from 'react';
import { usePageTitle } from '@/shared/lib';
import SettingsPageNavigation from './SettingsPage.module.css';
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
