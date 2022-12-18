import * as React from 'react';
import { CommonProps } from '@/shared/types';

import styles from './main-layout.module.css';

export interface MainLayoutProps extends CommonProps {
	readonly header: React.ReactElement;
}

export const MainLayout: React.FC<React.PropsWithChildren<MainLayoutProps>> = (
	props
) => {
	const { className, children, header, } = props;

	return (
		<section className={styles.layout}>
			{header}
			<main className={className}>{children}</main>
		</section>
	);
};
