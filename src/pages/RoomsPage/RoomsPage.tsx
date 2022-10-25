import * as React from 'react';
import { useGate } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { roomsGate } from '@/models/rooms';
import { usePageTitle } from '@/hooks';
import { MainLayout } from '@/layouts/MainLayout';
import { RoomList } from '@/components/RoomList';
import { RoomsHeader } from '@/components/RoomsHeader';

const RoomsPage: React.FC = () => {
	const { t } = useTranslation('rooms');
	useGate(roomsGate);
	usePageTitle(t('title'));

	return (
		<MainLayout>
			<RoomsHeader />
			<RoomList />
		</MainLayout>
	);
};

export default RoomsPage;
