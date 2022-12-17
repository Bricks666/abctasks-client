import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { RoomList, RoomsHeader } from '@/widgets/rooms';
import { usePageTitle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { MainLayout } from '@/shared/ui';

import styles from './RoomsPage.module.css';

const RoomsPage: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('rooms');
	usePageTitle(t('title'));

	return (
		<MainLayout className={cn(styles.layout, className)}>
			<RoomsHeader />
			<RoomList />
		</MainLayout>
	);
};

export default RoomsPage;
