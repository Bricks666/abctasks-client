import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Header, Popups, PopupsProps } from '@/widgets/page';
import {
	/**
	 * Перенести на уровень страницы
	 */
	RoomList,
	RoomsHeader
} from '@/widgets/rooms';
import { CreateRoom, UpdateRoom } from '@/features/rooms';
import { popupsMap } from '@/shared/configs';
import { usePageTitle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { MainLayout } from '@/shared/ui';
import { pageModel } from './model';

import styles from './styles.module.css';

const popupMap: PopupsProps['popupMap'] = {
	[popupsMap.createRoom]: CreateRoom,
	[popupsMap.updateRoom]: UpdateRoom,
};

const RoomsPage: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('rooms');
	usePageTitle(t('title'));

	return (
		<MainLayout className={cn(styles.layout, className)} header={<Header />}>
			<RoomsHeader />
			<RoomList />
			<Popups popupMap={popupMap} />
		</MainLayout>
	);
};

pageModel.loaded();

export default RoomsPage;
