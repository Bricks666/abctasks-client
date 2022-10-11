import * as React from 'react';
import { ContentLayout } from '@/ui/ContentLayout';
import { Text } from '@/ui/Text';
import { usePageTitle } from '@/hooks';
import { SettingsNavigation } from '@/components/SettingsNavigation';
import { Block } from '@/ui/Block';
import { SettingsContent } from '@/components/SettingsContent';
import { MainLayout } from '@/layouts/MainLayout';

import SettingsPageNavigation from './SettingsPage.module.css';

const SettingsPage: React.FC = () => {
	usePageTitle('Settings');
	return (
		<MainLayout>
			<ContentLayout className={SettingsPageNavigation.page}>
				<Block className={SettingsPageNavigation.header}>
					<Text component='h2'>Settings</Text>
				</Block>
				<SettingsNavigation />
				<SettingsContent />
			</ContentLayout>
		</MainLayout>
	);
};

export default SettingsPage;
