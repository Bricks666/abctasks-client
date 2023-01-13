import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Header, Popups, PopupsProps } from '@/widgets/page';
import {
	CreateRoomPopup,
	RoomList,
	RoomsHeader,
	UpdateRoomPopup
} from '@/widgets/rooms';
import { popups } from '@/shared/configs';
import { usePageTitle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { MainLayout } from '@/shared/ui';
import { pageModel } from './model';

import styles from './styles.module.css';

const popupMap: PopupsProps['popupMap'] = {
	[popups.createRoom]: CreateRoomPopup,
	[popups.updateRoom]: UpdateRoomPopup,
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
