import * as React from 'react';
import cn from 'classnames';
import { useGate } from 'effector-react';
import { useTranslation } from 'react-i18next';
import { roomsGate } from '@/models/rooms';
import { usePageTitle } from '@/hooks';
import { CommonProps } from '@/types';
import { MainLayout } from '@/layouts/MainLayout';
import { RoomList } from '@/components/RoomList';
import { RoomsHeader } from '@/components/RoomsHeader';

import styles from './RoomsPage.module.css';

const RoomsPage: React.FC<CommonProps> = (props) => {
	const { className } = props;
	const { t } = useTranslation('rooms');
	useGate(roomsGate);
	usePageTitle(t('title'));

	return (
		<MainLayout className={cn(styles.layout, className)}>
			<RoomsHeader />
			<RoomList />
		</MainLayout>
	);
};

export default RoomsPage;
