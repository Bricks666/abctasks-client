import * as React from 'react';
import { Header } from '@/shared/components';

import { CommonProps } from '@/shared/types';
import styles from './MainLayout.module.css';

export interface MainLayoutProps extends CommonProps {}

export const MainLayout: React.FC<React.PropsWithChildren<MainLayoutProps>> = (
	props
) => {
	const { className, children, } = props;

	return (
		<section className={styles.layout}>
			<Header />
			<main className={className}>{children}</main>
		</section>
	);
};
