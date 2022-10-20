import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { RoomList } from '@/components/RoomList';
import { usePageTitle } from '@/hooks';
import { RoomsHeader } from '@/components/RoomsHeader';
import { MainLayout } from '@/layouts/MainLayout';

const RoomsPage: React.FC = () => {
	const { t } = useTranslation('rooms');
	usePageTitle(t('title'));

	return (
		<MainLayout>
			<RoomsHeader />
			<RoomList />
		</MainLayout>
	);
};

export default RoomsPage;
