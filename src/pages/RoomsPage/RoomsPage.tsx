import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { RoomList } from '@/components/RoomList';
import { usePageTitle } from '@/hooks';
import { ContentLayout } from '@/ui/ContentLayout';
import { RoomsHeader } from '@/components/RoomsHeader';

export const RoomsPage: React.FC = () => {
	const { t } = useTranslation('rooms');
	usePageTitle(t('title'));
	return (
		<main>
			<ContentLayout>
				<RoomsHeader />
				<RoomList />
			</ContentLayout>
		</main>
	);
};
