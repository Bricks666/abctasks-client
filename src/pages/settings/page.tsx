import { Typography } from '@mui/material';
import * as React from 'react';

import { MainLayout } from '@/widgets/page';

import { usePageTitle } from '@/shared/lib';

import styles from './styles.module.css';

const SettingsPage: React.FC = () => {
	usePageTitle('Settings');

	return (
		<MainLayout>
			<div className={styles.header}>
				<Typography component='h2'>Settings</Typography>
			</div>
		</MainLayout>
	);
};

export default SettingsPage;
