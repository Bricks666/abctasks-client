import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from '@/widgets/page';
import { RoomList, RoomsHeader } from '@/widgets/rooms';
import { usePageTitle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { MainLayout } from '@/shared/ui';
import { pageModel } from './model';

import styles from './styles.module.css';

const RoomsPage: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('rooms');
	usePageTitle(t('title'));

	return (
		<MainLayout className={cn(styles.layout, className)} header={<Header />}>
			<RoomsHeader />
			<RoomList />
		</MainLayout>
	);
};

pageModel.loaded();

export default RoomsPage;
