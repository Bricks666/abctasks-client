import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from '@/widgets/page';
import { RoomHeader } from '@/widgets/rooms';
import { usePageTitle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { MainLayout } from '@/shared/ui';
import { pageModel } from './model';
import { Pages } from './pages';
import styles from './styles.module.css';
import { Tabs } from './ui';

const RoomPage: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('room');
	usePageTitle(t('title'));

	return (
		<MainLayout className={cn(styles.layout, className)} header={<Header />}>
			<RoomHeader />
			<Tabs />
			<div className={styles.content}>
				<Pages />
			</div>
		</MainLayout>
	);
};

pageModel.loaded();

export default RoomPage;
