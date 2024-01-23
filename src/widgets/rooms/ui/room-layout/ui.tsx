import cn from 'classnames';
import * as React from 'react';

import { CommonProps } from '@/shared/types';
import { Layout, PageLoader } from '@/shared/ui';

import { RoomHeader } from '../room-header';

import styles from './ui.module.css';

export interface RoomLayoutProps extends CommonProps, React.PropsWithChildren {}

export const RoomLayout: React.FC<RoomLayoutProps> = (props) => {
	const { className, children, } = props;

	return (
		<Layout
			className={cn(styles.layout, className)}
			slots={{
				header: <RoomHeader />,
			}}>
			<React.Suspense fallback={<PageLoader />}>{children}</React.Suspense>
		</Layout>
	);
};
