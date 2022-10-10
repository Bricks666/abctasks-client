import * as React from 'react';
import { ContentLayout } from '@/ui/ContentLayout';
import { Text } from '@/ui/Text';
import { usePageTitle } from '@/hooks';
import { SettingsNavigation } from '@/components/SettingsNavigation';
import { Block } from '@/ui/Block';
import { SettingsContent } from '@/components/SettingsContent';

import SettingsPageNavigation from './SettingsPage.module.css';

export const SettingsPage: React.FC = () => {
	usePageTitle('Settings');
	return (
		<main>
			<ContentLayout className={SettingsPageNavigation.page}>
				<Block className={SettingsPageNavigation.header}>
					<Text component='h2'>Settings</Text>
				</Block>
				<SettingsNavigation />
				<SettingsContent />
			</ContentLayout>
		</main>
	);
};
