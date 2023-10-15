import cn from 'classnames';
import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { usePageTitle } from '@/shared/lib';
import { CommonProps } from '@/shared/types';
import { MainLayout, PageLoader } from '@/shared/ui';

import { RoomHeader } from '../room-header';

import styles from './ui.module.css';

export interface RoomPageLayoutProps
	extends CommonProps,
		React.PropsWithChildren {}

export const RoomPageLayout: React.FC<RoomPageLayoutProps> = (props) => {
	const { className, children, } = props;
	const { t, } = useTranslation('room');
	usePageTitle(t('title'));

	return (
		<MainLayout
			className={cn(styles.layout, className)}
			header={<RoomHeader />}>
			<React.Suspense fallback={<PageLoader />}>{children}</React.Suspense>
		</MainLayout>
	);
};
