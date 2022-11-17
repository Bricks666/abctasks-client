import * as React from 'react';
import { CommonProps } from '@/types';
import { Header } from '@/components';

import styles from './MainLayout.module.css';

export interface MainLayoutProps extends CommonProps {}

export const MainLayout: React.FC<React.PropsWithChildren<MainLayoutProps>> = (
	props
) => {
	const { className, children } = props;

	return (
		<section className={styles.layout}>
			<Header />
			<main className={className}>{children}</main>
		</section>
	);
};
