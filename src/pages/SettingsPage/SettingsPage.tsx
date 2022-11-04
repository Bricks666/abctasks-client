import * as React from 'react';
import { Typography } from '@mui/material';
import { usePageTitle } from '@/hooks';
import { SettingsNavigation } from '@/components/SettingsNavigation';
import { SettingsContent } from '@/components/SettingsContent';
import { MainLayout } from '@/layouts/MainLayout';

import SettingsPageNavigation from './SettingsPage.module.css';

const SettingsPage: React.FC = () => {
	usePageTitle('Settings');
	return (
		<MainLayout>
			<div className={SettingsPageNavigation.header}>
				<Typography component='h2'>Settings</Typography>
			</div>
			<SettingsNavigation />
			<SettingsContent />
		</MainLayout>
	);
};

export default SettingsPage;
