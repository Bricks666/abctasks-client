import cn from 'classnames';
import { useGate } from 'effector-react';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { RoomList, RoomsHeader } from '@/shared/components';

import styles from './RoomsPage.module.css';
import { usePageTitle } from '@/hooks';
import { MainLayout } from '@/layouts';
import { RoomsGate } from '@/models';
import { CommonProps } from '@/types';

const RoomsPage: React.FC<CommonProps> = (props) => {
	const { className, } = props;
	const { t, } = useTranslation('rooms');
	useGate(RoomsGate);
	usePageTitle(t('title'));

	return (
		<MainLayout className={cn(styles.layout, className)}>
			<RoomsHeader />
			<RoomList />
		</MainLayout>
	);
};

export default RoomsPage;
