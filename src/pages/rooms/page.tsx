import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { Popups, PopupsProps } from '@/widgets/page';
import { RoomList } from '@/widgets/rooms';

import { CreateRoom, UpdateRoom } from '@/features/rooms';

import { popupsMap } from '@/shared/configs';
import { usePageTitle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';

import styles from './styles.module.css';
import { RoomsLayout } from './ui';

const popupMap: PopupsProps['popupMap'] = {
	[popupsMap.createRoom]: CreateRoom,
	[popupsMap.updateRoom]: UpdateRoom,
};

const RoomsPage: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('rooms');
	const title = t('title');
	usePageTitle(title);

	return (
		<RoomsLayout className={cn(styles.layout, className)}>
			<RoomList />
			<Popups popupMap={popupMap} />
		</RoomsLayout>
	);
};

export default RoomsPage;
